import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {
  Arrow,
  ArrowType,
  CircularLayout,
  DefaultLabelStyle, EdgePathLabelModel,
  EdgesSource, ExteriorLabelModel,
  GraphBuilder,
  GraphComponent,
  GraphEditorInputMode,
  GraphItemTypes,
  GraphOverviewComponent, HierarchicLayout, ICommand,
  IconLabelStyle,
  IEdge,
  IEdgeStyle,
  ILabelModelParameter,
  ILabelStyle,
  INode,
  INodeStyle,
  InteriorLabelModel,
  LabelCreator,
  LayoutExecutor,
  License,
  NodesSource,
  OrganicLayout, OrthogonalLayout,
  Point,
  PolylineEdgeStyle, RadialLayout,
  Rect,
  ShapeNodeStyle,
  Size
} from "yfiles";
// import {data} from './data'
import licenseValue from 'license.json';
import {GraphService} from "../../cym-services/graph/graph.service";

@Component({
  selector: 'cym-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GraphComponents implements OnInit, OnChanges {
  // data = data;
  visible = true;
  // data: any;
  graphComponent!: GraphComponent;
  selectedItem!: IEdge | INode | null;
  filter = false;
  @Input() data: any;
  @Input() layout: any = 'Organic';
  @ViewChild('graphComponent', {static: true}) graphContainer!: ElementRef;
  @ViewChild('overViewComponent', {static: true}) overViewContainer!: ElementRef;
  @Output() refreshGraph = new EventEmitter()


  // graph toolbar tools
  toolBarItems = [{
    toolName: 'toggle',
    icon: 'assets/image/overview.svg'
  },
    {
      toolName: 'zoomIn',
      icon: 'assets/image/zoomIn.svg'
    }, {
      toolName: 'zoomOut',
      icon: 'assets/image/zoomOut.svg'
    }, {
      toolName: 'fitContent',
      icon: 'assets/image/fit.svg'
    },
  ]
  overviewComponent!: GraphOverviewComponent;
  isFilterOpen = false;

  constructor(private graphService: GraphService) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.data) {
      // start creating graph
      this.createGraph();
    }
  }

  private createGraph() {
    // add licence
    License.value = licenseValue;

    // Graph Builder used to get json data and generate nodes and edges for graph
    const builder = new GraphBuilder();

    // creates a component to store graph
    this.initializeGraphComponent()

    // create nodes and edges for graph
    this.initializeNodeAndEdges(builder);

    // run graph
    this.buildGraph(this.graphComponent, builder);

    // zoom on click
    this.zoomOnCtrlClick(this.graphComponent);

    // editable mode for graph like creating node, adding/updating label, resizing node etc,.
    this.setInputMode(this.graphComponent);

    // this.styleForFraudData(this.graphComponent);

    // set the layout on filter
    this.layout = this.getLayout(this.filter, this.layout)

    // start building layout, example: Organic layout
    this.buildLayout(this.graphComponent, this.layout);

    // fit the whole graph into the canvas
    setTimeout(() => {
      this.graphComponent.zoomTo(this.graphComponent.contentRect);
    }, 50)

    // create overview component to view and navigate the graph in graph component
    this.initializeOverviewComponent(this.graphComponent);
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

  private initializeNodeAndEdges(builder: GraphBuilder) {
    // create nodes
    const nodesSource = this.getNodes(builder, {
      data: this.data.nodes,
      id: "id",
      style: (data: any) => this.getNodeShape({fill: data.vertex_color, shape: 'ellipse', stroke: null})
      // labels: ["label"]
    });

    //create edges
    const edgesSource = this.getEdges(builder, {
      data: this.data.edges,
      id: "id",
      labels: ["label"],
      sourceId: "source",
      targetId: "target"
    })

    // add style to node
    this.styleNode(nodesSource);
    // create icon label
    this.styleIconLabel(nodesSource);
    // style edges
    this.styleEdge(edgesSource);
  }

  private styleNode(nodesSource: NodesSource<any>) {
    // default will affect throughout the graph
    // nodesSource.nodeCreator.defaults.style = this.getNodeShape({
    //   stroke: null, fill: null, shape: 'ellipse'
    // })
    // // set node size
    // nodesSource.nodeCreator.defaults.size = this.getSize(30, 30)

    nodesSource.nodeCreator.defaults.style = this.getNodeShape({
      stroke: 'black', fill: 'lightgrey', shape: 'ellipse'
    })
    // set node size
    nodesSource.nodeCreator.defaults.size = this.getSize(30, 30)

  }

  // add icon to the node. In yfiles it is considered as label
  private styleIconLabel(nodesSource: NodesSource<any>) {
    const labelCreator = this.createLabel(nodesSource);
    labelCreator.defaults.layoutParameter = this.labelPlacement(ExteriorLabelModel.SOUTH);
    const iconCreator = nodesSource.nodeCreator.createLabelBinding();
    // null check
    iconCreator.textProvider = node => (node.imageUrl != null ? '' : null)
    iconCreator.styleProvider = node =>
      (new IconLabelStyle({
        icon: node.imageUrl,
        iconSize: new Size(20, 20),
        iconPlacement: InteriorLabelModel.CENTER
      }));
    const findingIcon = nodesSource.nodeCreator.createLabelBinding();
    // null check
    findingIcon.textProvider = node => (node.findings_icon != null ? '' : null)
    findingIcon.styleProvider = node =>
      (new IconLabelStyle({
        icon: node.findings_icon,
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
    edgesSource.edgeCreator.defaults.labels.style = this.getEdgeLabel({
      backgroundFill: 'white',
      textSize: 10
    })

    // aligning the edge label
    const labelModel = new EdgePathLabelModel({distance: 50});

    edgesSource.edgeCreator.defaults.labels.layoutParameter = labelModel.createDefaultParameter();
  }

  private buildGraph(graphComponent: GraphComponent, builder: GraphBuilder) {
    // assign graph builder nodes and edges to graph component  and run the graph
    graphComponent.graph = builder.buildGraph();
  }

  zoomOnCtrlClick(graphComponent: GraphComponent) {
    const containerElement = graphComponent.div;
    containerElement.addEventListener('click', (event: MouseEvent) => {
      // Check if the ctrl key (or cmd key on macOS) is pressed
      const ctrlKey = event.shiftKey;
      if (ctrlKey) {
        // Zoom in on click when ctrl/cmd key is pressed
        const zoomFactor = 2;
        const zoomPoint = graphComponent.toWorldCoordinates(new Point(event.clientX, event.clientY));
        graphComponent.zoomTo(zoomPoint, graphComponent.zoom * zoomFactor);
      }
    });
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

  }

  private leftClickListener(inputMode: GraphEditorInputMode) {
    inputMode.addItemLeftClickedListener((sender, evt) => {
      this.selectedItem = evt.item instanceof IEdge || evt.item instanceof INode ? evt.item : null;
    })
  }

  private styleForFraudData(graphComponent: GraphComponent) {
    graphComponent.graph.nodes.forEach((node) => {
      if (node.tag.isFraud) {
        graphComponent.graph.setStyle(node, new ShapeNodeStyle({fill: null, shape: "ellipse", stroke: '#ff1a61'}))
      }
    })
  }


  private buildLayout(graphComponent: GraphComponent, layoutType: string) {
    // set layout
    const layout = this.prepareLayout(layoutType);

    // get an executor for executing layout
    const layoutExecutor = this.getLayoutExecutor({
      graphComponent: graphComponent,
      layout: layout ? layout : new OrganicLayout({minimumNodeDistance: 90, nodeEdgeOverlapAvoided: true}),
      duration: '0.5s',
    })

    // start executing the layout
    layoutExecutor.start().then();
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
    this.overviewComponent.contentRect = new Rect(0, 0, 2000, 2000);
    this.overviewComponent.fitContent();
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

  private getEdgeLabel(options: any): ILabelStyle {
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
      case 'Hierarchy':
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

  private getNode(graphComponent: GraphComponent, label: string) {
    return graphComponent.graph.nodes.find(n => n.tag.label === label);
  }

  // toolbar functionality
  zooIn() {
    ICommand.INCREASE_ZOOM.execute(null,this.graphComponent)
  }

  zoomOut() {
    ICommand.DECREASE_ZOOM.execute(null,this.graphComponent)
  }

  fitContent() {
    ICommand.FIT_GRAPH_BOUNDS.execute(null, this.graphComponent)
  }

  // toolbar event handling
  clickEvent(tool: { icon: string; toolName: string }) {
    if (this.graphComponent) {
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
      }
    }
  }

  setFrame(isFilterOpen: boolean) {
    this.isFilterOpen = isFilterOpen;
  }


  refreshData(params: any) {
    console.log(params)
    this.refreshGraph.emit(params);
  }
}



