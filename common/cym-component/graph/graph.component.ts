import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output, SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {
  Arrow,
  ArrowType,
  CircularLayout, DefaultLabelStyle, EdgePathLabelModel,
  EdgesSource, EdgeStyleDecorationInstaller, ExteriorLabelModel, GeneralPath,
  GraphBuilder,
  GraphComponent,
  GraphEditorInputMode,
  GraphItemTypes,
  GraphOverviewComponent, GraphSelectionIndicatorManager, GraphViewerInputMode, HierarchicLayout, IArrow, ICommand,
  IconLabelStyle,
  IEdge,
  IEdgeStyle,
  ILabelModelParameter,
  ILabelStyle, IModelItem, INode,
  INodeStyle,
  InteriorLabelModel, ItemClickedEventArgs,
  LabelCreator, LabelStyleDecorationInstaller,
  LayoutExecutor,
  License, Neighborhood,
  NodesSource, NodeStyleDecorationInstaller,
  OrganicLayout, OrthogonalLayout,
  PolylineEdgeStyle, RadialLayout,
  Rect, ShapeNodeShape,
  ShapeNodeStyle,
  Size, StyleDecorationZoomPolicy, TraversalDirection
} from "yfiles";
import licenseValue from 'license.json';
import {CymService} from 'common/cym-services/systemService/cymSystemService';
import {data} from "./data";

@Component({
  selector: 'cym-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GraphComponents implements OnInit, OnChanges, AfterViewInit {
  // data = data;
  visible = true;
  // data: any;
  private graphComponent!: GraphComponent;
  private neighbourComponent!: GraphComponent;

  selectedItem!: IEdge | INode | null;
  filter = false;
  hoverBorder: any;
  vertexColor: any;
  borderColor: any;
  @Input() data: any;
  @Input() tools: any;
  @ViewChild('graphComponent', {static: true}) graphContainer!: ElementRef;
  @ViewChild('overViewComponent', {static: true}) overViewContainer!: ElementRef;
  @ViewChild('neighbour', {static: true}) neighbour!: ElementRef;

  @Output() refreshGraph = new EventEmitter();
  @Output() findingsClicked = new EventEmitter();
  @Input() onClickRightSidebar: any;

  // graph toolbar tools
  overviewComponent!: GraphOverviewComponent;
  isFilterOpen = false;
  neighboursOptions: any;
  selectedNode!: INode;
  selectedNeighbour: any;
  isFullscreen: boolean = false;
  originalNeighbourhood: any;
  showDetails!: boolean;

  constructor(private cdr: ChangeDetectorRef, private systemService: CymService) {
  }

  ngOnInit() {
    this.getNeighbourOption();
    this.systemService.toolClick.subscribe(tool => {
      this.clickEvent(tool)
    })
  }

  ngAfterViewInit() {
    // if (this.data) {
    //   // start creating graph
    //   this.run();
    // }
  }

  ngOnChanges(changes:SimpleChanges) {
    console.log(changes);
    if (changes.hasOwnProperty('data') && this.data?.nodes) {
      // start creating graph
      this.run();
    }
    if (this.onClickRightSidebar) {
      this.fitContent();
    }
    // this.clickEvent(this.tools);
  }

  private run() {
    // add licence
    License.value = licenseValue;

    // creates a component to store graph
    this.initializeGraphComponent();

    // editable mode for graph like creating node, adding/updating label, resizing node etc,.
    this.setInputMode(this.graphComponent);

    this.createGraph(this.data, this.graphComponent);
    // fit the whole graph into the canvas
    setTimeout(() => {
      this.fitContent();
    }, 100);

    // create overview component to view and navigate the graph in graph component
    this.initializeOverviewComponent(this.graphComponent);

    this.initialiseNeighbourhood();

  }

  createGraph(data: any, graphComponent: GraphComponent) {
    // Graph Builder used to get json data and generate nodes and edges for graph
    const builder = new GraphBuilder();

    // create nodes and edges for graph
    this.initializeNodeAndEdges(builder, data);

    // run graph
    this.buildGraph(graphComponent, builder);

    // start building layout, example: Organic layout
    this.buildLayout(graphComponent, 'Organic');

  }

  private initializeNodeAndEdges(builder: GraphBuilder, data: any) {
    // create nodes
    const nodesSource = this.getNodes(builder, {
      data: data.nodes,
      id: "id",
      style: (data: any) => this.getNodeShape({
        fill: data.vertex_color ? data.vertex_color : "#E0E0E0",
        shape: 'ellipse',
        stroke: data.border_color ? data.border_color : null
      })
    });

    //create edges
    const edgesSource = this.getEdges(builder, {
      data: data.edges,
      id: "id",
      labels: ["label"],
      sourceId: "source",
      targetId: "target"
    });

    // add style to node
    this.styleNode(nodesSource);
    // create icon label
    this.styleIconLabel(nodesSource);
    // style edges
    this.styleEdge(edgesSource);
  }

  private styleNode(nodesSource: NodesSource<any>) {
    // set node size
    nodesSource.nodeCreator.defaults.size = this.getSize(30, 30)
    nodesSource.nodeCreator.defaults.labels.style = this.getLabelStyle({
      backgroundFill: '#EBEDEF',
      textSize: 10
    });


  }


  // add icon to the node. In yfiles it is considered as label
  private styleIconLabel(nodesSource: NodesSource<any>) {
    const labelCreator = this.createLabel(nodesSource);
    labelCreator.defaults.layoutParameter = this.labelPlacement(ExteriorLabelModel.SOUTH);
    const iconCreator = nodesSource.nodeCreator.createLabelBinding();
    // null check
    iconCreator.textProvider = node => (node.imageUrl != null ? '' : null);
    iconCreator.styleProvider = node =>
      (new IconLabelStyle({
        icon: node.imageUrl,
        iconSize: new Size(20, 20),
        iconPlacement: InteriorLabelModel.CENTER
      }));
    const findingIcon = nodesSource.nodeCreator.createLabelBinding();
    // null check
    findingIcon.textProvider = node => (node.findingsUrl != null ? '' : null);
    findingIcon.styleProvider = node =>
      (new IconLabelStyle({
        icon: node.findingsUrl,
        iconSize: new Size(10, 10),
      }));
    findingIcon.defaults.layoutParameter = InteriorLabelModel.NORTH_EAST

  }

  private styleEdge(edgesSource: EdgesSource<any>) {
    edgesSource.edgeCreator.defaults.style = this.getEdgeStyle({
      stroke: "black",
      targetArrow: this.arrow({
        type: ArrowType.TRIANGLE,
        fill: "black"
      })
    });

    // style edge label
    edgesSource.edgeCreator.defaults.labels.style = this.getLabelStyle({
      backgroundFill: '#EBEDEF',
      textSize: 10
    });

    // aligning the edge label
    const labelModel = new EdgePathLabelModel({distance: 50});

    edgesSource.edgeCreator.defaults.labels.layoutParameter = labelModel.createDefaultParameter();
  }

  private buildGraph(graphComponent: GraphComponent, builder: GraphBuilder) {
    // assign graph builder nodes and edges to graph component  and run the graph
    graphComponent.graph = builder.buildGraph();
  }


  private setInputMode(graphComponent: GraphComponent) {
    const inputMode = graphComponent.inputMode = new GraphEditorInputMode({
      allowCreateNode: false,
      allowCreateEdge: false,
      allowCreateBend: false,
      allowDuplicate: false,
      allowGroupingOperations: false,
      allowClipboardOperations: false,
      allowUndoOperations: false,
      allowEditLabelOnDoubleClick: false,
      showHandleItems: GraphItemTypes.NONE
    });
    this.leftClickListener(inputMode);
    this.hoverEvent(inputMode);
  }

  hoverEvent(inputMode: GraphEditorInputMode) {
    inputMode.itemHoverInputMode.enabled = true;
    inputMode.itemHoverInputMode.hoverItems = GraphItemTypes.EDGE | GraphItemTypes.NODE;
// ignore items of other types which might be in front of them
    inputMode.itemHoverInputMode.discardInvalidItems = false;
    this.graphHighlight(inputMode);
  }

  itemHighlight(selectedItem: any) {
    const styleHighlight = this.graphComponent.highlightIndicatorManager;
    const decorator = this.graphComponent.graph.decorator;
    const highlightShape = new ShapeNodeStyle({
      shape: ShapeNodeShape.ELLIPSE,
      stroke: `4px grey`,
      fill: null
    });

    const nodeStyleHighlight = new NodeStyleDecorationInstaller({
      nodeStyle: highlightShape,
      // that should be slightly larger than the real node
      margins: 0,
      // but have a fixed size in the view coordinates
      zoomPolicy: StyleDecorationZoomPolicy.WORLD_COORDINATES
    });
    decorator.nodeDecorator.highlightDecorator.setImplementation(nodeStyleHighlight);
    if (styleHighlight) {
      styleHighlight?.clearHighlights();
      // then see where we are hovering over, now
      const newItem = selectedItem.item;
      if (newItem !== null) {
        // we highlight the item itself
        styleHighlight?.addHighlight(newItem);
      }
    }

  }

  graphHighlight(inputMode: GraphEditorInputMode) {
    inputMode.itemHoverInputMode.addHoveredItemChangedListener((sender, args) => {
      const hoverItem = args.item;
      // e.g. add a highlight to newItem here
      const styleHighlight = this.graphComponent.highlightIndicatorManager;
      const decorator = this.graphComponent.graph.decorator;
      this.hoverBorder = hoverItem?.tag.hover_border_color;
      const highlightShape = new ShapeNodeStyle({
        shape: ShapeNodeShape.ELLIPSE,
        stroke: `4px ${this.hoverBorder}`,
        fill: null
      });

      const nodeStyleHighlight = new NodeStyleDecorationInstaller({
        nodeStyle: highlightShape,
        // that should be slightly larger than the real node
        margins: 0,
        // but have a fixed size in the view coordinates
        zoomPolicy: StyleDecorationZoomPolicy.WORLD_COORDINATES
      });

      const edgeStyle = new PolylineEdgeStyle({
        stroke: `4px ${this.hoverBorder}`,
        targetArrow: this.arrow({
          type: ArrowType.TRIANGLE,
          fill: this.hoverBorder
        }),
        // sourceArrow: this.arrow({
        //   type: ArrowType.TRIANGLE,
        //   fill: this.hoverBorder
        // })
      });
      const edgeStyleHighlight = new EdgeStyleDecorationInstaller({
        edgeStyle,
        zoomPolicy: StyleDecorationZoomPolicy.WORLD_COORDINATES,
      });

      decorator.nodeDecorator.highlightDecorator.setImplementation(nodeStyleHighlight);
      decorator.edgeDecorator.highlightDecorator.setFactory(() =>
        edgeStyleHighlight
      );
      // first remove previous highlights
      if (styleHighlight) {
        styleHighlight?.clearHighlights();
        // then see where we are hovering over, now
        const newItem = hoverItem;
        if (newItem !== null) {
          // we highlight the item itself
          styleHighlight?.addHighlight(newItem);
          if (newItem instanceof INode) {
            // and if it's a node, we highlight all adjacent edges, too
            for (const edge of this.graphComponent.graph.edgesAt(newItem)) {

              const labelStyle = new DefaultLabelStyle({
                backgroundFill: '#EBEDEF',
                textSize: 10,
                verticalTextAlignment: 'center',
                horizontalTextAlignment: 'center'
              });
              const labelStyleHighlight = new LabelStyleDecorationInstaller({
                labelStyle,
                zoomPolicy: StyleDecorationZoomPolicy.WORLD_COORDINATES
              });
              decorator.labelDecorator.highlightDecorator.setImplementation(labelStyleHighlight);
              styleHighlight?.addHighlight(edge);
              if (edge.tag.label) {
                styleHighlight.addHighlight(edge?.labels?.get(0))
              }
            }
          } else if (newItem instanceof IEdge) {
            // if it's an edge - we highlight the adjacent nodes
            const labelStyle = new DefaultLabelStyle({
              backgroundFill: '#EBEDEF',
              textSize: 10,
              verticalTextAlignment: 'center',
              horizontalTextAlignment: 'center'
            });
            const labelStyleHighlight = new LabelStyleDecorationInstaller({
              labelStyle,
              zoomPolicy: StyleDecorationZoomPolicy.WORLD_COORDINATES
            });
            decorator.labelDecorator.highlightDecorator.setImplementation(labelStyleHighlight);
            styleHighlight?.addHighlight(newItem);
            if (newItem.tag.label) {
              styleHighlight.addHighlight(newItem?.labels?.get(0))
            }
          }
        }
      }
    })
  }

  private leftClickListener(inputMode: GraphViewerInputMode | GraphEditorInputMode) {
    inputMode.addItemLeftClickedListener((sender, evt) => {
      this.selectedItem = evt.item instanceof IEdge || evt.item instanceof INode ? evt.item : null;
      this.systemService.setGraphItem(this.selectedItem);
      this.checkNeighbour(evt);
      this.checkFindings(evt);
      this.selectionStyle(inputMode);
    })

  }

  selectionStyle(inputMode: GraphEditorInputMode | GraphViewerInputMode) {

    // inputMode.selectableItems = GraphItemTypes.NONE
    inputMode.focusableItems = GraphItemTypes.NONE;
    const selectionNodeStyle = new ShapeNodeStyle({
      shape: ShapeNodeShape.ELLIPSE,
      stroke: `4px ${this.hoverBorder}`,
      fill: null
    });
    const selectionEdgeStyle = new PolylineEdgeStyle({
      stroke: `4px ${this.hoverBorder}`,
      targetArrow: this.arrow({
        type: ArrowType.TRIANGLE,
        fill: this.hoverBorder
      })
    });
    const labelStyle = new DefaultLabelStyle({
      backgroundFill: '#EBEDEF',
      textSize: 10,
      verticalTextAlignment: 'center',
      horizontalTextAlignment: 'center'
    });
    this.graphComponent.selectionIndicatorManager = new GraphSelectionIndicatorManager({
      nodeStyle: selectionNodeStyle,
      edgeStyle: selectionEdgeStyle,
      labelStyle: labelStyle
    })
  }

  checkNeighbour(evt: ItemClickedEventArgs<IModelItem>) {
    if (evt.item instanceof INode && !this.isFullscreen) {
      this.selectedNode = evt.item;
      this.getNeighbourGraph(evt.item)
    }
  }

  checkFindings(evt: ItemClickedEventArgs<IModelItem>) {
    if (evt.item instanceof INode && evt.item.tag.findings === 'True') {
      this.findingsClicked.emit(evt.item.tag)
    }
  }

  private buildLayout(graphComponent: GraphComponent, layoutType: string) {
    // set layout
    const layout = this.prepareLayout(layoutType);

    // get an executor for executing layout
    const layoutExecutor = this.getLayoutExecutor({
      graphComponent: graphComponent,
      layout: layout ? layout : new OrganicLayout({minimumNodeDistance: 90, nodeEdgeOverlapAvoided: true}),
      duration: '0.5s',
    });

    // start executing the layout
    layoutExecutor.start().then();
  }

  private initializeGraphComponent() {
    const container = this.graphContainer.nativeElement;
    // inorder to update the graph component with another graph, check if the component already exist, if yes: cleanup
    if (this.graphComponent?.div) {
      this.graphComponent.cleanUp();
      this.graphComponent = new GraphComponent(container);
      this.filter = true; //if true change the layout from organic to some other layout
    } else {
      this.filter = false;
      this.graphComponent = new GraphComponent(container);
    }
  }

  private initializeOverviewComponent(graphComponent: GraphComponent) {
    const container = this.overViewContainer.nativeElement;
    // reinitialize overview component to the update the view with new graph
    if (this.overviewComponent?.div) {
      this.overviewComponent.cleanUp();
      this.overviewComponent = new GraphOverviewComponent(container, graphComponent);
    } else {
      this.overviewComponent = new GraphOverviewComponent(container, graphComponent);
    }
    this.overviewComponent.autoDrag = true;
    this.fitContent()
  }

  private initialiseNeighbourhood() {
    const container = this.neighbour.nativeElement;
    this.neighbourComponent = new GraphComponent(container);
    this.neighbourComponent.contentRect = new Rect(0, 0, 100, 100);
    this.fitContent();
  }


  toggle() {
    // toggle overview
    this.visible = !this.visible;
  }

  private getNodes(builder: GraphBuilder, options: any): NodesSource<any> {
    return builder.createNodesSource(options);
  }

  private getEdges(builder: GraphBuilder, options: any): EdgesSource<any> {
    return builder.createEdgesSource(options);
  }

  private getNodeShape(options: any): INodeStyle {
    return new ShapeNodeStyle(options);
  }

  private getSize(width: number, height: number): Size {
    return new Size(width, height);
  }

  private createLabel(nodesSource: NodesSource<any>): LabelCreator<any> {
    return nodesSource.nodeCreator.createLabelBinding(data => data.label);
  }

  private labelPlacement(placement: ILabelModelParameter): ILabelModelParameter {
    return placement;
  }

  private getEdgeStyle(options: any): IEdgeStyle {
    return new PolylineEdgeStyle(options);
  }

  private arrow(options: any): Arrow {
    return new Arrow(options);
  }

  private getLabelStyle(options: any): ILabelStyle {
    return new DefaultLabelStyle(options);
  }

  private getLayout(filter: boolean, layout: any) {
    if (filter) {
      return layout;
    } else {
      return 'Organic'
    }
  }

  private prepareLayout(layout: string): any {
    switch (layout) {
      case 'Organic':
        return new OrganicLayout({minimumNodeDistance: 90, nodeEdgeOverlapAvoided: true});
      case 'Hierarchical':
        return new HierarchicLayout();
      case 'Circular':
        return new CircularLayout();
      case 'Radial':
        return new RadialLayout();
      case 'Orthogonal':
        return new OrthogonalLayout();
    }

  }

  private getLayoutExecutor(options: any): LayoutExecutor {
    return new LayoutExecutor(options);
  }


  // toolbar functionality
  zooIn() {
    ICommand.INCREASE_ZOOM.execute(null, this.graphComponent)
  }

  zoomOut() {
    ICommand.DECREASE_ZOOM.execute(null, this.graphComponent)
  }

  fitContent() {
    this.graphComponent.zoomTo(this.graphComponent.contentRect);
  }

  // toolbar event handling
  clickEvent(tool: { icon: string; toolName: string }) {
    if (this.graphComponent && tool) {
      switch (tool.toolName) {
        case 'toggle':
          this.toggle();
          break;
        case 'zoomIn':
          this.zooIn();
          break;
        case 'zoomOut':
          this.zoomOut();
          break;
        case 'fitContent':
          this.fitContent();
          break;
        case 'circularLayout':
          this.layoutChanger(this.graphComponent, 'Circular');
          break;
        case 'organicLayout':
          this.layoutChanger(this.graphComponent, 'Organic');
          break;
        case 'orthogonalLayout':
          this.layoutChanger(this.graphComponent, 'Orthogonal');
          break;
        case 'hierarchialLayout':
          this.layoutChanger(this.graphComponent, 'Hierarchical');
          break;
        case 'radialLayout':
          this.layoutChanger(this.graphComponent, 'Radial');
      }
    }
  }

  setFrame(isFilterOpen: boolean) {
    this.isFilterOpen = isFilterOpen;
    this.cdr.detectChanges();
  }


  refreshData(params: any) {
    console.log(params);
    this.refreshGraph.emit(params);
  }

  private getNeighbourOption() {
    this.neighboursOptions = [{
      name: 'Neighbourhood', value: TraversalDirection.BOTH
    }, {
      name: 'Successor', value: TraversalDirection.SUCCESSOR
    }, {
      name: 'Predecessor', value: TraversalDirection.PREDECESSOR
    },]
  }

  getNeighbourGraph(node: INode) {
    if (this.graphComponent) {
      const jsonGraph: { nodes: any[], edges: any[] } = {
        nodes: [],
        edges: []
      };
      const algorithm = new Neighborhood({
        traversalDirection: this.selectedNeighbour, startNodes: [node]
      });
      algorithm.maximumDistance = algorithm.traversalDirection === TraversalDirection.BOTH ? 1 : 2;
      const result = algorithm.run(this.graphComponent.graph);
      jsonGraph.nodes.push(node?.tag);
      for (const neighbor of result.neighbors) {
        jsonGraph.nodes.push(neighbor?.tag);
        if (algorithm.traversalDirection === TraversalDirection.SUCCESSOR) {
          this.graphComponent.graph.inEdgesAt(neighbor).forEach((edge) => {
            jsonGraph.edges.push(edge?.tag)
          })
        } else if (algorithm.traversalDirection === TraversalDirection.PREDECESSOR) {
          this.graphComponent.graph.outEdgesAt(neighbor).forEach((edge) => {
            jsonGraph.edges.push(edge.tag)
          })
        } else {
          this.graphComponent.graph.edgesAt(node).forEach((edge) => {
            if (jsonGraph.edges.findIndex(ele => JSON.stringify(ele) === JSON.stringify(edge.tag)) === -1) {
              jsonGraph.edges.push(edge.tag)
            }
          })
        }
      }

      this.originalNeighbourhood = jsonGraph;
      this.createGraph(jsonGraph, this.neighbourComponent);
      this.neighbourComponent.zoomTo(this.neighbourComponent.contentRect);
      this.cdr.detectChanges();
    }

  }

  switch(isFullscreen: boolean) {
    if (this.neighbourComponent.graph.nodes.size > 0) {
      this.isFullscreen = isFullscreen;
      if (isFullscreen) {
        this.graphComponent.graph = this.neighbourComponent.graph;
        this.createGraph(this.data, this.neighbourComponent);
        const node = this.graphComponent.graph.nodes.find(node => node.tag.id === this.selectedNode.tag.id);
        if (node) {
          this.graphComponent.selection.setSelected(node, true);
        }
        this.setInputMode(this.graphComponent);
        this.neighbourComponent.zoomTo(this.neighbourComponent.contentRect);
        ICommand.FIT_GRAPH_BOUNDS.execute(null, this.graphComponent);
        this.showDetails = false;
      } else {
        this.showDetails = false;
        this.createGraph(this.data, this.graphComponent);
        this.createGraph(this.originalNeighbourhood, this.neighbourComponent);
        const node = this.graphComponent.graph.nodes.find(node => node.tag.id === this.selectedNode.tag.id);
        if (node) {
          this.graphComponent.selection.setSelected(node, true);
        }
        this.setInputMode(this.graphComponent);
        this.systemService.setGraphItem(node);
        this.neighbourComponent.zoomTo(this.neighbourComponent.contentRect);
        this.graphComponent.zoomTo(this.graphComponent.contentRect);

      }
    }
  }

  private layoutChanger(graphComponent: GraphComponent, layoutType: string) {
    if (graphComponent) {
      this.buildLayout(graphComponent, layoutType);
      this.fitContent();
    }
  }
}



