import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {
  DefaultLabelStyle,
  DragDropEffects,
  EdgePathLabelModel,
  EdgeSides,
  ExteriorLabelModel,
  GraphBuilder,
  GraphComponent,
  GraphEditorInputMode,
  GraphOverviewComponent, GraphViewerInputMode,
  GroupNodeLabelModel,
  GroupNodeStyle,
  ICommand,
  IEdge,
  IGraph,
  INode,
  Insets,
  License,
  Neighborhood,
  NodeDropInputMode,
  QueryContinueDragEventArgs,
  Rect,
  ShapeNodeShape,
  SimpleNode,
  Size,
  SvgExport,
  TraversalDirection
} from "yfiles";
import licenseValue from "../../../license.json";
import {addClass, createDemoGroupStyle, createShapeNodeStyle, initDemoStyles, removeClass} from "./demo-styles";
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'cym-graph-editor',
  templateUrl: './graph-editor.component.html',
  styleUrls: ['./graph-editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GraphEditorComponent implements OnInit {
  @Input() data: any;
  @ViewChild('graphContainer', {static: true}) graphContainer!: ElementRef;
  @ViewChild('overViewComponent', {static: true}) overViewContainer!: ElementRef;
  @ViewChild('neighbour', {static: true}) neighbour!: ElementRef;

  @ViewChild('panel', {static: true}) panelContainer!: ElementRef;
  private overviewComponent!: GraphOverviewComponent;
  private neighbourComponent!: GraphComponent;

  private graphComponent!: GraphComponent;
  isFilterOpen: boolean = false;
  toolBarItems = [{
    toolName: 'save',
    icon: 'assets/image/save.svg',
    height: 20, width: 20

  }, {
    toolName: 'refresh',
    icon: 'assets/image/refresh.svg',
    height: 20, width: 20
  }, {
    toolName: 'zoomIn',
    icon: 'assets/image/zoomIn.svg',
    height: 20, width: 20
  }, {
    toolName: 'zoomOut',
    icon: 'assets/image/zoomOut.svg',
    height: 20, width: 20
  }, {
    toolName: 'undo',
    icon: 'assets/image/undo.svg',
    height: 15, width: 15
  }, {
    toolName: 'redo',
    icon: 'assets/image/redo.svg',
    height: 15, width: 15
  },
    {
      toolName: 'fit',
      icon: 'assets/image/fullscreen.svg',
      height: 15, width: 15
    }, {
      toolName: 'cut',
      icon: 'assets/image/cut.svg',
      height: 15, width: 15
    }, {
      toolName: 'copy',
      icon: 'assets/image/copy.svg',
      height: 15, width: 15
    }, {
      toolName: 'paste',
      icon: 'assets/image/paste.svg',
      height: 15, width: 15

    }

  ]
  selectedItem: any;
  isItemClicked!: boolean;
  iGraph: any = {};
  private nodeSelection: any;
  private edgeSelection: any;

  selectedNeighbour: any;
  neighboursOptions: any;
  selectedNode!: INode;
  private original: any;
  private originalNeighbourHood: any;


  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.run();
  }

  run() {
    License.value = licenseValue;

    // get the canvas for drawing graph
    const divElement = this.graphContainer.nativeElement;
    this.graphComponent = new GraphComponent(divElement);

    // make the graph editable
    this.graphComponent.inputMode = new GraphEditorInputMode({
      allowGroupingOperations: true
    });

    // enable undoEngine
    this.graphComponent.graph.undoEngineEnabled = true;

    // set default styling for nodes, edges etc
    this.initTutorialDefaults(this.graphComponent.graph);

    // prepare drag and drop
    this.setInputMode();

    this.initializeOverviewComponent(this.graphComponent)

    this.initialiseNeighbourhood();

    this.getNeighbourOption();

  }

  setInputMode(): void {

    // get the input handler
    const inputMode = this.graphComponent.inputMode = new GraphEditorInputMode();

    // get node drag and drop input handler
    const nodeDropInputMode = inputMode.nodeDropInputMode;

    nodeDropInputMode.enabled = true;

    // get group node predicate that tell that node dropped is group node
    nodeDropInputMode.isGroupNodePredicate = (draggedNode: INode): boolean =>
      draggedNode.style instanceof GroupNodeStyle

    // set drag and drop preview for tracing the path
    nodeDropInputMode.showPreview = true;

    // set the required input listener for nodes and edges
    this.listeners(inputMode);
  }

  private listeners(inputMode: GraphEditorInputMode) {
    // when a new node, edge or label is created by drag and drop or on double click
    this.nodeListener(inputMode);

    this.edgeListener(inputMode);

    this.labelListener(inputMode);

    // on click of node get the sidebar open with the node properties
    this.leftClickListener(inputMode);

    // start to prepare sidebar panel
    this.initializeDragAndDropPanel();
  }

  private leftClickListener(inputMode: GraphEditorInputMode) {
    // node click listener which sends node or edge details to the sidebar
    inputMode.addItemLeftClickedListener((sender, evt) => {
      this.isItemClicked = true;

      this.selectedItem = evt.item instanceof IEdge || evt.item instanceof INode ? evt.item : null;

      if (evt.item instanceof INode) {
        this.selectedNode = evt.item;
        this.getNeighbourGraph(evt.item)

      }
    })
  }

  private nodeListener(inputMode: GraphEditorInputMode) {
    inputMode.addNodeCreatedListener((sender, evt) => {
      const node = evt.item
      if (node.style instanceof GroupNodeStyle) {
        console.log('is group')
      }

      // set node tag for creating json
      node.tag = {id: uuidv4().toString(), style: node.style, layout: node.layout};

      // add the new node to the graph
      this.graphComponent.graph.nodes.append(node);
      this.save();
    });
  }

  labelListener(inputMode: GraphEditorInputMode) {
    // when new label is created
    inputMode.addLabelAddedListener(this.getLabelListner);

    inputMode.addLabelTextChangedListener(this.getLabelListner);
  }

  getLabelListner = (sender: any, evt: { item: any; }) => {
    // label handler
    const label = evt.item;
    const owner = label.owner;

    if (owner instanceof INode) {
      console.log(this.validateLabel(label.text, 'node'));
      owner.tag = {
        id: owner.tag.id,
        label: !this.validateLabel(label.text, 'node') ? label.text : null,
        style: owner.tag.style,
        layout: owner.tag.layout
      };

      //when the node label is change, change the source and target of the respective edge
      this.replaceEdgeTag(owner.tag.id, label.text, owner.tag.label)

    } else if (owner instanceof IEdge) {
      owner.tag = {
        id: owner.tag.id,
        source: owner.tag.source,
        sourceLabel: owner.tag.sourceLabel,
        target: owner.tag.target,
        targetLabel: owner.tag.targetLabel,
        label: label.text,
        style: owner.tag.style,
        layout: owner.tag.layout
      };
    }

    this.save();
    this.createGraph(this.iGraph, this.graphComponent)
  }
  isFullscreen: boolean = false;

  private replaceEdgeTag(id: string, label: string, oldLabel: string) {
    //when the node label is change, change the source and target of the respective edge

    this.graphComponent.graph.edges.forEach((edge) => {

      if (edge.tag.sourceLabel === id || edge.tag.sourceLabel === oldLabel) {
        edge.tag.sourceLabel = label
      } else if (edge.tag.targetLabel === id || edge.tag.targetLabel === oldLabel) {
        edge.tag.targetLabel = label
      }

    });

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
    this.overviewComponent.fitContent();
  }

  private initialiseNeighbourhood() {
    const container = this.neighbour.nativeElement;
    this.neighbourComponent = new GraphComponent(container);
    this.neighbourComponent.contentRect = new Rect(0, 0, 100, 100);
    this.neighbourComponent.fitGraphBounds()
  }


  edgeListener(inputMode: GraphEditorInputMode) {
    inputMode.createEdgeInputMode.addEdgeCreatedListener((sender, evt) => {

      const edge = evt.item;
      const sourceNode = edge.sourceNode;
      const targetNode = edge.targetNode;

      edge.tag = {
        id: uuidv4().toString(),
        source: sourceNode?.tag?.id,
        target: targetNode?.tag?.id,
        sourceLabel: sourceNode?.tag?.label ? sourceNode?.tag?.label : sourceNode?.tag?.id,
        targetLabel: targetNode?.tag?.label ? targetNode?.tag?.label : targetNode?.tag?.id,
        style: edge.style,
      };

      this.graphComponent.graph.edges.append(edge);
      this.save()
    })
  }

  initializeDragAndDropPanel(): void {
    // get the div for panel
    const panel = this.panelContainer.nativeElement;

    // set the node styles
    const defaultNode = this.graphComponent.graph.nodeDefaults.style
    const ellipse = createShapeNodeStyle(ShapeNodeShape.ELLIPSE);
    const rectangle = createShapeNodeStyle(ShapeNodeShape.RECTANGLE);
    const diamond = createShapeNodeStyle(ShapeNodeShape.DIAMOND);
    const fatArrow = createShapeNodeStyle(ShapeNodeShape.FAT_ARROW);
    const fatArrow2 = createShapeNodeStyle(ShapeNodeShape.FAT_ARROW2);
    const hexagon = createShapeNodeStyle(ShapeNodeShape.HEXAGON);
    const hexagon2 = createShapeNodeStyle(ShapeNodeShape.HEXAGON2);
    // const icon = createIconNode('assets/image/edit.svg')
    const defaultGroupNodeStyle = this.graphComponent.graph.groupNodeDefaults.style;
    const newGroup = createDemoGroupStyle({colorSetName: 'demo-palette-23', foldingEnabled: true})

    // create an array of all node styles
    const nodeStyles = [defaultNode, ellipse, rectangle, fatArrow, fatArrow2, hexagon, hexagon2, diamond, defaultGroupNodeStyle, newGroup]

    // create visual images for the nodes for panel
    nodeStyles.forEach((style: any): void => {
      this.addNodeVisual(style, panel)
    })
  }

  createNodeVisual(style: any): string {

    // get svg of the style for creating source url for image
    const exportComponent = new GraphComponent()
    const exportGraph = exportComponent.graph
    exportGraph.createNode(new Rect(0, 0, 40, 40), style)
    exportComponent.updateContentRect(new Insets(5))
    const svgExport = new SvgExport(exportComponent.contentRect)
    const svg = svgExport.exportSvg(exportComponent)
    const svgString = SvgExport.exportSvgString(svg)
    return SvgExport.encodeSvgDataUrl(svgString)

  }

  addNodeVisual(style: any, panel: Element): void {
    // set the div for image
    const div = document.createElement('div')
    div.setAttribute('style', 'width: 40px; height: 40px; margin: 10px auto; cursor: grab;');

    // set image
    const img = document.createElement('img')
    img.setAttribute('style', 'width: auto; height: auto;')
    img.setAttribute('src', this.createNodeVisual(style))

    // initialise drag handler
    const startDrag = (): void => {
      const simpleNode = new SimpleNode()
      simpleNode.layout = new Rect(0, 0, 40, 40)
      simpleNode.style = style.clone()
      const dragPreview = document.createElement('div')
      dragPreview.appendChild(img.cloneNode(true))
      const dragSource = NodeDropInputMode.startDrag(
        div, // The source of the drag gesture, i.e. the element in the drag and drop panel.
        simpleNode, // The node that is dragged. This is used to provide a preview within the GC during the drag.
        DragDropEffects.ALL, // The allowed actions for this drag.
        true, // Whether to the cursor during the drag.
        dragPreview // The optional preview element that is shown outside of the GC during the drag.
      )
      dragSource.addQueryContinueDragListener(
        (src: object, args: QueryContinueDragEventArgs): void => {
          if (args.dropTarget === null) {
            removeClass(dragPreview, 'hidden')
          } else {
            addClass(dragPreview, 'hidden')
          }
        }
      )
    }

    img.addEventListener(
      'mousedown',
      (event: MouseEvent): void => {
        startDrag()
        event.preventDefault()
      },
      false
    )
    img.addEventListener(
      'touchstart',
      (event: TouchEvent): void => {
        startDrag()
        event.preventDefault()
      },
    );
    // add the image to the div
    div.appendChild(img)
    // add div to the panel
    panel.appendChild(div)
  }

  initTutorialDefaults(graph: IGraph): void {

    // set default styling for nodes and edges
    initDemoStyles(graph)

    graph.groupNodeDefaults.style = new GroupNodeStyle({
      tabFill: '#46a8d5',
      tabPosition: 'top-leading',
      contentAreaFill: '#b5dcee'
    })
    graph.groupNodeDefaults.labels.style = new DefaultLabelStyle({
      horizontalTextAlignment: 'left',
      textFill: '#eee'
    })

    graph.groupNodeDefaults.labels.layoutParameter =
      new GroupNodeLabelModel().createDefaultParameter()

    graph.nodeDefaults.size = new Size(40, 40)

    graph.nodeDefaults.labels.layoutParameter = new ExteriorLabelModel({
      insets: 5
    }).createParameter('south')

    graph.edgeDefaults.labels.layoutParameter = new EdgePathLabelModel({
      distance: 5,
      autoRotation: true
    }).createRatioParameter({sideOfEdge: EdgeSides.BELOW_EDGE})
  }

  createGraph(data: any, graphComponent: GraphComponent): void {

    // get the graph builder to create graph from json ie; initGraph
    const builder = new GraphBuilder()

    const sourceNode = builder.createNodesSource({
      data: data.nodes, id: "id", labels: ['label'], style: "style", layout: "layout"
    });

    const edgeNode = builder.createEdgesSource({
      data: data.edges, id: "id", labels: ['label'], sourceId: "source", targetId: "target", style: "style"
    })

    edgeNode.edgeCreator.defaults.labels.style = new DefaultLabelStyle({
      backgroundFill: 'white',
      textSize: 10
    })
    // aligning the edge label
    const labelModel = new EdgePathLabelModel({distance: 50});

    edgeNode.edgeCreator.defaults.labels.layoutParameter = labelModel.createDefaultParameter();

    graphComponent.graph = builder.buildGraph();

    this.initTutorialDefaults(graphComponent.graph)
  }

  setFrame(isFilterOpen: boolean) {
    // frame for sidebar and the graph
    this.isFilterOpen = isFilterOpen;
    this.cdr.detectChanges();
  }

  clickEvent(tool: { icon: string; toolName: string }) {
    // tools
    if (this.graphComponent) {
      switch (tool.toolName) {
        case 'save':
          this.save()
          break;
        case 'refresh':
          this.createGraph(this.iGraph, this.graphComponent);
          break;
        case 'undo':
          ICommand.UNDO.execute(null, this.graphComponent)
          break;
        case 'zoomIn':
          ICommand.INCREASE_ZOOM.execute(null, this.graphComponent)
          break;
        case 'zoomOut':
          ICommand.DECREASE_ZOOM.execute(null, this.graphComponent)
          break;
        case 'fit':
          ICommand.FIT_CONTENT.execute(null, this.graphComponent)
          break;
        case 'redo':
          ICommand.REDO.execute(null, this.graphComponent)
          break;
        case 'cut':
          ICommand.CUT.execute(null, this.graphComponent)
          break;
        case 'copy':
          this.copy();
          this.save();
          break;
        case 'paste':
          this.paste()
          break;
      }
    }
  }

  save() {

    // create json
    const jsonGraph: { nodes: any[], edges: any[] } = {
      nodes: [],
      edges: []
    };

    this.graphComponent.graph.nodes.forEach((node) => {

      const jsonNode = {
        id: node?.tag?.id,
        label: node?.tag?.label,
        style: node.tag.style, layout: node.tag.layout,
        properties: node.tag?.properties
      };

      jsonGraph.nodes.push(jsonNode);
    });

    this.graphComponent.graph.edges.forEach((edge) => {

      const jsonEdge = {
        id: edge?.tag?.id,
        source: edge?.tag?.source,
        target: edge?.tag?.target,
        label: edge?.tag?.label,
        sourceLabel: edge?.tag.sourceLabel,
        targetLabel: edge?.tag.targetLabel,
        style: edge.tag.style
        // Include other edge properties as needed
      };

      jsonGraph.edges.push(jsonEdge);
    });

    console.log(jsonGraph);

    // save the json in a variable
    this.iGraph = jsonGraph;
  }

  changeEdgeNode(property: any) {
    // setting the manipulated graph properties to the graph
    if (property.source) {

      this.graphComponent.graph.edges.forEach((data) => {

        const source = this.graphComponent.graph.nodes.find((node) =>
          (node.tag.label === property.sourceLabel || node.tag.id === property.sourceLabel))?.tag.id;

        const target = this.graphComponent.graph.nodes.find((node) =>
          (node.tag.label === property.targetLabel || node.tag.id === property.targetLabel))?.tag.id;

        if (data.tag.id === property.id) {
          data.tag = {
            id: data.tag.id,
            source: source,
            target: target,
            label: !this.validateLabel(property.label, 'edge') ? property.label : null,
            sourceLabel: property.sourceLabel, targetLabel: property.targetLabel,
            style: data.tag.style,
            layout: data.tag.layout
          }
        }
      })
    } else {
      this.graphComponent.graph.nodes.forEach((data) => {
        if (data.tag.id === property.id) {

          const oldLabel = data.tag.label

          data.tag = {
            id: data.tag.id,
            label: !this.validateLabel(property.label, 'node') ? property.label : null,
            style: data.tag.style,
            layout: data.tag.layout,
            properties: property.properties
          }

          this.replaceEdgeTag(data.tag.id, data.tag.label, oldLabel)

        }
      })
    }
    this.save();
    console.log(this.iGraph)
    this.createGraph(this.iGraph, this.graphComponent)
  }

  private validateLabel(label: string, type: string) {
    // label shouldn't be same
    if (type === 'edge') {
      return this.graphComponent.graph.edges.find((edge) => edge.tag.label === label)
    } else {
      return this.graphComponent.graph.nodes.find((node) => node.tag.label === label)
    }

  }

  private copy() {
    // store the selected nodes and edges
    this.nodeSelection = this.graphComponent.selection.selectedNodes.toList().map((node) => node.tag.id);
    this.edgeSelection = this.graphComponent.selection.selectedEdges.toList().map((edge) => edge.tag.id);

    // copy the items
    ICommand.COPY.execute(null, this.graphComponent);
    this.graphComponent.clipboard.fromClipboardCopier.addNodeCopiedListener((sender, evt) => {
      // shift the position of the copied node 5px from the original node
      this.graphComponent.graph.setNodeLayout(evt.copy, new Rect(evt.copy.layout.x + 5, evt.copy.layout.y, evt.copy.layout.width, evt.copy.layout.height))
      evt.copy.tag = {id: uuidv4(), label: undefined, style: evt.original.style, layout: evt.copy.layout};

    })

    this.graphComponent.clipboard.fromClipboardCopier.addEdgeCopiedListener((sender, evt) => {
      evt.copy.tag = {
        id: uuidv4(),
        label: undefined,
        source: evt.copy.sourceNode?.tag?.id,
        target: evt.copy.targetNode?.tag?.id,
        style: evt.copy.tag.style
      };
    })

    // Note: selection is lost here

  }

  private paste() {

    ICommand.PASTE.execute(null, this.graphComponent);

    this.save();
    this.createGraph(this.iGraph, this.graphComponent);

    // regain the selection back
    this.graphComponent.graph.nodes.forEach((node) => {
      // this.graphComponent.selection.setSelected(node, true);
      if (this.nodeSelection.includes(node.tag.id)) {
        this.graphComponent.selection.setSelected(node, true);
      }
    })
  }


  getNeighbourGraph(node: INode) {
    console.log('o',this.iGraph)
    this.original = {...this.iGraph}
    const jsonGraph: { nodes: any[], edges: any[] } = {
      nodes: [],
      edges: []
    };
    const algorithm = new Neighborhood({
      traversalDirection: this.selectedNeighbour, startNodes: [node]
    });
    algorithm.maximumDistance = algorithm.traversalDirection === TraversalDirection.BOTH ? 1 : 2;
    const result = algorithm.run(this.graphComponent.graph);
    jsonGraph.nodes.push(node?.tag)
    for (const neighbor of result.neighbors) {
      jsonGraph.nodes.push(neighbor?.tag)
      if (algorithm.traversalDirection === TraversalDirection.SUCCESSOR) {
        this.graphComponent.graph.edges.filter(edge => edge.tag.target === neighbor.tag.id).forEach((edge) => {
          jsonGraph.edges.push(edge?.tag)
        })
      } else if (algorithm.traversalDirection === TraversalDirection.PREDECESSOR) {
        this.graphComponent.graph.edges.filter(edge => edge.tag.source === neighbor.tag.id).forEach((edge) => {
          jsonGraph.edges.push(edge.tag)
        })
      } else {
        this.graphComponent.graph.edges.filter(edge => edge.tag.source === neighbor.tag.id || edge.tag.target === neighbor.tag.id).forEach((edge) => {
          jsonGraph.edges.push(edge.tag)
        })
      }
    }
    this.originalNeighbourHood = jsonGraph;
    this.save();
    this.createGraph(jsonGraph, this.neighbourComponent)
    this.neighbourComponent.contentRect = new Rect(0, 0, 100, 100);
    this.neighbourComponent.fitGraphBounds()
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

  switch(isFullscreen: boolean) {
    if (this.neighbourComponent.graph.nodes.size > 0) {
      this.isFullscreen = isFullscreen;
      console.log(this.original)
      if (isFullscreen) {
        this.graphComponent.graph = this.neighbourComponent.graph;
        this.createGraph(this.original, this.neighbourComponent);
        this.graphComponent.inputMode = new GraphViewerInputMode();
      } else {
        this.createGraph(this.iGraph, this.graphComponent);
        this.createGraph(this.originalNeighbourHood, this.neighbourComponent);
        this.setInputMode()
      }
    }
  }
}
