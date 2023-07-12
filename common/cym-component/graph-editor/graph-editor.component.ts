import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input, OnChanges,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {
  Arrow, ArrowType,
  Color,
  DefaultLabelStyle,
  DragDropEffects,
  EdgePathLabelModel,
  EdgeSides, EdgeStyleDecorationInstaller,
  ExteriorLabelModel,
  GraphBuilder,
  GraphComponent,
  GraphEditorInputMode, GraphItemTypes,
  GraphOverviewComponent, GraphViewerInputMode,
  GroupNodeLabelModel,
  GroupNodeStyle, IArrow,
  ICommand,
  IEdge, IEdgeStyle,
  IGraph,
  INode, INodeStyle,
  Insets, IRectangle,
  License,
  Neighborhood,
  NodeDropInputMode, PolylineEdgeStyle, NodeStyleDecorationInstaller,
  QueryContinueDragEventArgs,
  Rect,
  ShapeNodeShape, ShapeNodeShapeStringValues, ShapeNodeStyle,
  SimpleNode,
  Size,
  SolidColorFill, Stroke, StyleDecorationZoomPolicy,
  SvgExport,
  TraversalDirection, ImageNodeStyle, LabelStyleDecorationInstaller
} from "yfiles";
import licenseValue from "../../../license.json";
import {
  addClass,
  createDemoGroupStyle, createIconNode,
  createShapeNodeStyle,
  initDemoStyles,
  removeClass
} from "./demo-styles";
import {v4 as uuidv4} from 'uuid';
import {NONE_TYPE} from "@angular/compiler";
import {
  Automotive,
  Business,
  FileImg,
  Finance,
  GraphTools,
  Network,
  People,
  Shapes,
  Social,
  Vehicle
} from "./graphUtils";
import {CymService} from "../../cym-services/systemService/cymSystemService";

@Component({
  selector: 'cym-graph-editor',
  templateUrl: './graph-editor.component.html',
  styleUrls: ['./graph-editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GraphEditorComponent implements AfterViewInit, OnInit, OnChanges {
  @Input() data: any;
  @Input() tools: any;
  @ViewChild('graphContainer', {static: true}) graphContainer!: ElementRef;
  @ViewChild('overViewComponent', {static: true}) overViewContainer!: ElementRef;
  @ViewChild('neighbour', {static: true}) neighbour!: ElementRef;

  @ViewChild('shapes', {static: true}) shapeNodeContainer!: ElementRef;
  @ViewChild('images', {static: true}) imageNodeContainer!: ElementRef;
  private overviewComponent!: GraphOverviewComponent;
  private neighbourComponent!: GraphComponent;

  private graphComponent!: GraphComponent;
  isFilterOpen: boolean = false;
  toolBarItems = GraphTools;
  selectedItem: any;
  showDetails!: boolean;
  iGraph: any = {};
  shape: any;
  private nodeSelection: any;
  private edgeSelection: any;

  selectedNeighbour: any;
  neighboursOptions: any;
  selectedNode!: INode;
  private original: any;
  private originalNeighbourHood: any;
  private shapeStyleDragDrop: any;
  private businessImg: any;
  dragDropElements: any;
  private vehicle: any;
  private finance: any;
  private automotive: any;
  private social: any;
  private people: any;
  private file: any;
  private network: any;

  constructor(private cdr: ChangeDetectorRef, private systemService: CymService) {
  }

  ngOnInit() {
    this.createDragDropNodeStyle();
    this.systemService.toolClick.subscribe(tool => {
      this.clickEvent(tool)
    })
  }

  ngAfterViewInit() {
    this.run();
  }

  ngOnChanges() {
  }

  createDragDropNodeStyle() {
    this.shapeStyleDragDrop = Shapes
    this.businessImg = Business
    this.vehicle = Vehicle
    this.finance = Finance
    this.automotive = Automotive
    this.social = Social
    this.people = People
    this.file = FileImg;
    this.network = Network;
    this.dragDropElements = [{
      id: 0,
      headers: 'Shapes',
      style: this.getNodeStyleForDragDrop('shape', this.shapeStyleDragDrop),
    }, {
      id: 1,
      headers: 'Business',
      style: this.getNodeStyleForDragDrop('image', this.businessImg),
    }, {
      id: 2,
      headers: 'Vehicle',
      style: this.getNodeStyleForDragDrop('image', this.vehicle),
    }, {
      id: 3,
      headers: 'Finance',
      style: this.getNodeStyleForDragDrop('image', this.finance),
    }, {
      id: 4,
      headers: 'Automotive',
      style: this.getNodeStyleForDragDrop('image', this.automotive),
    }, {
      id: 5,
      headers: 'Social',
      style: this.getNodeStyleForDragDrop('image', this.social),
    }, {
      id: 6,
      headers: 'People',
      style: this.getNodeStyleForDragDrop('image', this.people),
    }, {
      id: 7,
      headers: 'Files',
      style: this.getNodeStyleForDragDrop('image', this.file),
    }, {
      id: 8,
      headers: 'Network',
      style: this.getNodeStyleForDragDrop('image', this.network),
    }];
  }

  run() {
    License.value = licenseValue;

    // get the canvas for drawing graph
    const divElement = this.graphContainer.nativeElement;
    this.graphComponent = new GraphComponent(divElement);
    // enable undoEngine
    this.graphComponent.graph.undoEngineEnabled = true;

    // set default styling for nodes, edges etc
    this.initTutorialDefaults(this.graphComponent.graph);

    // prepare drag and drop
    this.setNodeInputMode();

    this.initializeOverviewComponent(this.graphComponent)

    this.initialiseNeighbourhood();

    this.getNeighbourOption();


  }

  setEditorMode(): GraphEditorInputMode {

    // get the input handler
    return new GraphEditorInputMode();
  }

  setNodeInputMode(): void {

    const inputMode = this.graphComponent.inputMode = this.setEditorMode()
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

  private leftClickListener(inputMode: GraphEditorInputMode | GraphViewerInputMode) {
    // node click listener which sends node or edge details to the sidebar
    inputMode.addItemLeftClickedListener((sender, evt) => {
      this.showDetails = true;

      this.selectedItem = evt.item instanceof IEdge || evt.item instanceof INode ? evt.item : null;

      if (evt.item instanceof INode && !this.isFullscreen) {
        this.selectedNode = evt.item;
        this.getNeighbourGraph(evt.item)

      }
    })
  }

  edgeListener(inputMode: GraphEditorInputMode) {
    inputMode.createEdgeInputMode.addEdgeCreatedListener((sender, evt) => {

      const edge = evt.item;
      const stroke = this.getEdgeStrokeColor(edge.style);
      const arrow = this.getEdgeArrowStyle(edge.style);
      const style = this.getEdgeStyle(stroke, arrow);
      const sourceNode = edge.sourceNode;
      const targetNode = edge.targetNode;

      edge.tag = {
        id: uuidv4().toString(),
        source: sourceNode?.tag?.id,
        target: targetNode?.tag?.id,
        sourceLabel: sourceNode?.tag?.label ? sourceNode?.tag?.label : sourceNode?.tag?.id,
        targetLabel: targetNode?.tag?.label ? targetNode?.tag?.label : targetNode?.tag?.id,
        style: style,
      };

      this.graphComponent.graph.edges.append(edge);
    })
  }

  private nodeListener(inputMode: GraphEditorInputMode) {
    inputMode.addNodeCreatedListener((sender, evt) => {
      const node = evt.item;
      let shape = null;
      let fillColor = null;
      let strokeColor = null;
      let style = null;
      let layout = null;


      if (node.style instanceof GroupNodeStyle) {
        console.log('is group')
      }

      if (node.style instanceof ImageNodeStyle) {
        const imageStyle = node.style as ImageNodeStyle;
        const image = imageStyle.image;
        const style = {fill: null, shape: null, stroke: null, image: image};
        const layout = this.getNodeLayout(node.layout)
        node.tag = {id: uuidv4().toString(), style: style, layout: layout};
      } else if (node.style instanceof ShapeNodeStyle) {
        shape = this.getShape(node.style);
        fillColor = this.getFillColor(node.style);
        strokeColor = this.getStrokeColor(node.style);
        style = this.getStyleForSaving(shape, fillColor, strokeColor, null);
        layout = this.getNodeLayout(node.layout);
        // set node tag for creating json
        node.tag = {id: uuidv4().toString(), style: style, layout: layout};
      }


      // add the new node to the graph
      this.graphComponent.graph.nodes.append(node);
    });
    this.hoverEvent(inputMode);
  }

  hoverEvent(inputMode: GraphEditorInputMode) {
    inputMode.itemHoverInputMode.enabled = true
    inputMode.itemHoverInputMode.hoverItems = GraphItemTypes.EDGE | GraphItemTypes.NODE
// ignore items of other types which might be in front of them
    inputMode.itemHoverInputMode.discardInvalidItems = false
// handle changes on the hovered items
    inputMode.itemHoverInputMode.addHoveredItemChangedListener((sender, args) => {
      const hoverItem = args.item
      // e.g. add a highlight to newItem here
      const styleHighlight = this.graphComponent.highlightIndicatorManager
      const orangeRed = Color.ORANGE_RED
      const orangeStroke = new Stroke(orangeRed.r, orangeRed.g, orangeRed.b, 220, 3).freeze()
      const decorator = this.graphComponent.graph.decorator
      const node1 = hoverItem
      if (node1 instanceof INode) {
        this.shape = node1.tag.style.shape
      }
      const highlightShape = new ShapeNodeStyle({
        shape: this.shape ? this.shape : 0,//ShapeNodeShape.ROUND_RECTANGLE,
        stroke: orangeStroke,
        fill: null
      })

      const nodeStyleHighlight = new NodeStyleDecorationInstaller({
        nodeStyle: highlightShape,
        // that should be slightly larger than the real node
        margins: 5,
        // but have a fixed size in the view coordinates
        zoomPolicy: StyleDecorationZoomPolicy.VIEW_COORDINATES
      })

      const edgeStyle = new PolylineEdgeStyle({
        stroke: orangeStroke,
        // targetArrow: IArrow.TRIANGLE,
        // sourceArrow:
      })
      const edgeStyleHighlight = new EdgeStyleDecorationInstaller({
        edgeStyle,
        zoomPolicy: StyleDecorationZoomPolicy.VIEW_COORDINATES
      })

      decorator.nodeDecorator.highlightDecorator.setImplementation(nodeStyleHighlight)
      decorator.edgeDecorator.highlightDecorator.setFactory(edge =>
        edgeStyleHighlight
      )
      // first remove previous highlights
      if (styleHighlight) {
        styleHighlight?.clearHighlights()
        // then see where we are hovering over, now
        const newItem = hoverItem
        if (newItem !== null) {
          // we highlight the item itself
          styleHighlight?.addHighlight(newItem)
          if (newItem instanceof INode) {
            // and if it's a node, we highlight all adjacent edges, too
            for (const edge of this.graphComponent.graph.edgesAt(newItem)) {

              const labelStyle = new DefaultLabelStyle({
                backgroundFill: 'white',
                textSize: 10,
                verticalTextAlignment: 'center',
                horizontalTextAlignment: 'center'
              });
              const labelStyleHighlight = new LabelStyleDecorationInstaller({
                labelStyle,
                zoomPolicy: StyleDecorationZoomPolicy.WORLD_COORDINATES
              })
              decorator.labelDecorator.highlightDecorator.setImplementation(labelStyleHighlight)
              styleHighlight?.addHighlight(edge)
              if (edge.tag.label) {
                styleHighlight.addHighlight(edge?.labels?.get(0))
              }
            }
          } else if (newItem instanceof IEdge) {
            // if it's an edge - we highlight the adjacent nodes
            const labelStyle = new DefaultLabelStyle({
              backgroundFill: 'white',
              textSize: 10,
              verticalTextAlignment: 'center',
              horizontalTextAlignment: 'center'
            });
            const labelStyleHighlight = new LabelStyleDecorationInstaller({
              labelStyle,
              zoomPolicy: StyleDecorationZoomPolicy.WORLD_COORDINATES
            })
            decorator.labelDecorator.highlightDecorator.setImplementation(labelStyleHighlight)

            styleHighlight?.addHighlight(newItem)
            if (newItem.tag.label) {
              styleHighlight.addHighlight(newItem?.labels?.get(0))
            }

          }
        }
      }
    })
  }

  getStyleForSaving(shape: ShapeNodeShape, fillColor: string, strokeColor: string, image: any) {
    return {shape: shape, fill: fillColor, stroke: strokeColor, image}
  }

  getEdgeStyle(stroke: string, arrow: { arrowType: ArrowType; arrowFill: string }) {
    return {stroke: stroke, arrow: arrow}
  }

  getShape(nodeStyle: INodeStyle) {
    const style = nodeStyle as ShapeNodeStyle;
    return style.shape;
  }

  getStrokeColor(nodeStyle: INodeStyle) {
    const style = nodeStyle as ShapeNodeStyle
    const stroke = style.stroke as Stroke
    const strokeFill = stroke.fill as SolidColorFill
    const strokeColor = strokeFill.color as Color
    return this.rgbToHex(strokeColor)

  }

  getFillColor(nodeStyle: INodeStyle) {
    const style = nodeStyle as ShapeNodeStyle
    const fill = style.fill as SolidColorFill
    const color = fill.color as Color;
    return this.rgbToHex(color)

  }

  getEdgeStrokeColor(edgeStyle: IEdgeStyle) {
    const style = edgeStyle as PolylineEdgeStyle
    const stroke = style.stroke as Stroke
    const strokeFill = stroke.fill as SolidColorFill
    const strokeColor = strokeFill.color as Color
    return this.rgbToHex(strokeColor)
  }

  getEdgeArrowStyle(edgeStyle: IEdgeStyle) {
    const style = edgeStyle as PolylineEdgeStyle;
    const targetArr = style.targetArrow as Arrow;
    const arrowType = targetArr.type;
    const arrowFill = targetArr.fill as SolidColorFill;
    const arrowFillColor = arrowFill.color as Color;
    return {arrowFill: this.rgbToHex(arrowFillColor), arrowType: arrowType}

  }

  rgbToHex(rgb: Color) {
    const r = rgb.r.toString(16).padStart(2, '0');
    const g = rgb.g.toString(16).padStart(2, '0');
    const b = rgb.b.toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
  }

  getNodeLayout(layout: IRectangle) {
    const x = layout.x;
    const y = layout.y;
    const width = layout.width;
    const height = layout.height
    return {x, y, width, height};

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
      owner.tag = {
        id: owner.tag.id,
        label: !this.validateLabel(label.text, owner.tag.id, 'node') ? label.text : null,
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
    this.neighbourComponent.fitGraphBounds();
    this.cdr.detectChanges();
  }


  initializeDragAndDropPanel(): void {

    // set the node styles
    // const user = createImageNodeStyle("assets/image/add-user.svg")
    // const arrowTriangle = createPolylineEdgeStyle("NONE","triangle",30)

    setTimeout(() => {

      this.dragDropElements.forEach((element: any, index: number) => {
        const id = 'item' + index
        const ele = document.getElementById(id);
        element['style'].forEach((style: any): void => {
          if (ele) {
            this.addNodeVisual(style, ele)
          }
        })
      })
    }, 0)

    // create visual images for the nodes for panel

  }

  createNodeVisual(style: ShapeNodeStyle | ImageNodeStyle): string {

    // get svg of the style for creating source url for image
    const exportComponent = new GraphComponent()
    const exportGraph = exportComponent.graph
    exportGraph.createNode(new Rect(0, 0, 30, 30), style)
    exportComponent.updateContentRect(new Insets(5))
    const svgExport = new SvgExport(exportComponent.contentRect)
    const svg = svgExport.exportSvg(exportComponent)
    const svgString = SvgExport.exportSvgString(svg)
    return SvgExport.encodeSvgDataUrl(svgString)

  }

  addNodeVisual(style: ShapeNodeStyle | ImageNodeStyle, panel: Element): void {
    // set the div for image
    const div = document.createElement('div')
    div.setAttribute('style', 'width: auto; height: 30px; margin: 10px auto; cursor: grab;');

    // set image
    const img = document.createElement('img')
    img.setAttribute('style', 'width: 30px; height: 30px;');
    // img.setAttribute('src', this.createNodeVisual(style))

    if (style instanceof ShapeNodeStyle) {
      img.setAttribute('src', this.createNodeVisual(style))
    }
    if (style instanceof ImageNodeStyle) {
      // img.setAttribute('style', 'width: 30px; height: 30px;');
      img.setAttribute('src', <string>style.image)
    }
    // initialise drag handler
    const startDrag = (): void => {
      const simpleNode = new SimpleNode()
      simpleNode.layout = new Rect(0, 0, 30, 30)
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

    graph.nodeDefaults.size = new Size(30, 30)

    graph.nodeDefaults.labels.layoutParameter = new ExteriorLabelModel({
      insets: 5
    }).createParameter('south')

    graph.edgeDefaults.labels.layoutParameter = new EdgePathLabelModel({
      distance: 5,
      autoRotation: true
    }).createRatioParameter({sideOfEdge: EdgeSides.BELOW_EDGE})
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
            label: !this.validateLabel(property.label, property.id, 'edge') ? property.label : null,
            sourceLabel: property.sourceLabel, targetLabel: property.targetLabel,
            style: data.tag.style,
            layout: data.tag.layout
          }
        }
      })
    } else {
      this.graphComponent.graph.nodes.forEach((data) => {
        if (data.tag.id === property.id) {
          let label;
          const oldLabel = data.tag.label
          if (!this.validateLabel(property.label, property.id, 'node')) {
            label = property.label
          }
          data.tag = {
            id: data.tag.id,
            label: label,
            style: data.tag.style,
            layout: data.tag.layout,
            properties: property.properties
          }

          this.replaceEdgeTag(data.tag.id, data.tag.label, oldLabel)

        }
      })
    }
    this.printGraph();
    this.createJson();
    this.createGraph(this.iGraph, this.graphComponent)
    this.cdr.detectChanges();
  }

  printGraph() {
    this.graphComponent.graph.nodes.forEach((node) => {
      console.log(node.tag)
    })
  }

  createGraph(data: any, graphComponent: GraphComponent): void {
    // get the graph builder to create graph from json ie; initGraph
    const builder = new GraphBuilder()
    const sourceNode = builder.createNodesSource({
      data: data.nodes,
      id: "id",
      labels: ['label'],
      style: (nodeStyle: any) => (!nodeStyle.style.image ? new ShapeNodeStyle({
        shape: nodeStyle.style.shape,
        fill: nodeStyle.style.fill,
        stroke: nodeStyle.style.stroke
      }) : new ImageNodeStyle({
        image: nodeStyle.style.image
      })),
      layout: (nodeLayout: INode) => new Rect(nodeLayout.layout.x, nodeLayout.layout.y, nodeLayout.layout.width, nodeLayout.layout.height)
    });

    const edgeNode = builder.createEdgesSource({
      data: data.edges,
      id: "id",
      labels: ['label'],
      sourceId: "source",
      targetId: "target",
      style: (edgeStyle: any) => new PolylineEdgeStyle({
        stroke: edgeStyle.style.stroke,
        targetArrow: new Arrow({type: edgeStyle.style.arrow.arrowType, fill: edgeStyle.style.arrow.arrowFill})
      })
    })

    edgeNode.edgeCreator.defaults.labels.style = new DefaultLabelStyle({
      backgroundFill: 'white',
      textSize: 10
    })
    // aligning the edge label
    const labelModel = new EdgePathLabelModel({distance: 50});

    edgeNode.edgeCreator.defaults.labels.layoutParameter = labelModel.createDefaultParameter();

    graphComponent.graph = builder.buildGraph();
    this.initTutorialDefaults(graphComponent.graph);
    this.layoutListener();
  }

  layoutListener() {
    this.graphComponent.graph.addNodeLayoutChangedListener((source, node, oldLayout) => {
      const layout = this.getNodeLayout(oldLayout)
      node.tag = {id: node.tag.id, style: node.tag.style, layout: layout};
    })
  }

  setFrame(isFilterOpen: boolean) {
    // frame for sidebar and the graph
    this.isFilterOpen = isFilterOpen;
    this.cdr.detectChanges();
  }

  save() {
    this.createJson();
    localStorage.setItem('graph', JSON.stringify(this.iGraph));
    //   api call for saving
  }

  load() {
    // api call for loading and creating graph
    const getJson = localStorage.getItem('graph')
    const graphJson = getJson ? JSON.parse(getJson) : null;
    this.createGraph(graphJson, this.graphComponent);
  }

  clickEvent(tool: { icon: string; toolName: string }) {
    // tools
    if (this.graphComponent && tool) {
      switch (tool.toolName) {
        case 'save':
          this.save()
          break;
        case 'load':
          this.load();
          break;
        case 'undo':
          ICommand.UNDO.execute(null, this.graphComponent);
          break;
        case 'zoomIn':
          ICommand.INCREASE_ZOOM.execute(null, this.graphComponent);

          break;
        case 'zoomOut':
          ICommand.DECREASE_ZOOM.execute(null, this.graphComponent);
          break;
        case 'fit':
          ICommand.FIT_CONTENT.execute(null, this.graphComponent);
          break;
        case 'redo':
          ICommand.REDO.execute(null, this.graphComponent);
          break;
        case 'cut':
          ICommand.CUT.execute(null, this.graphComponent);
          break;
        case 'copy':
          this.copy();
          break;
        case 'paste':
          this.paste()
          break;
        case 'delete':
          ICommand.DELETE.execute(null, this.graphComponent);
          break;
      }
    }
  }

  createJson() {

    // create json
    const jsonGraph: { nodes: any[], edges: any[] } = {
      nodes: [],
      edges: []
    };

    this.graphComponent.graph.nodes.forEach((node) => {

      const jsonNode = {
        id: (node.tag?.id) ? node?.tag?.id : null,
        label: (node.tag?.label) ? node.tag.label : null,
        style: (node.tag?.style) ? node.tag.style : null,
        layout: (node.tag?.layout) ? node.tag.layout : null,
        properties: (node.tag?.properties) ? node.tag?.properties : null
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

    this.iGraph = jsonGraph;
  }


  private validateLabel(label: string, id: any, type: string) {
    // label shouldn't be same
    if (type === 'edge') {
      return this.graphComponent.graph.edges.find((edge) => edge.tag.label === label)
    } else {
      return this.graphComponent.graph.nodes.find((node) => (node.tag.id !== id && node.tag.label === label))
    }

  }

  private copy() {
    // copy the items
    ICommand.COPY.execute(null, this.graphComponent);
    this.graphComponent.clipboard.fromClipboardCopier.addNodeCopiedListener((sender, evt) => {
      const node = evt.original
      const shape = this.getShape(node.style);
      const fillColor = this.getFillColor(node.style);
      const strokeColor = this.getStrokeColor(node.style);
      const style = this.getStyleForSaving(shape, fillColor, strokeColor, null);
      const layout = this.getNodeLayout(node.layout);
      // shift the position of the copied node 5px from the original node
      this.graphComponent.graph.setNodeLayout(evt.copy, new Rect(evt.copy.layout.x + 5, evt.copy.layout.y, evt.copy.layout.width, evt.copy.layout.height))
      evt.copy.tag = {id: uuidv4(), label: null, style: style, layout: layout};

    })

    this.graphComponent.clipboard.fromClipboardCopier.addEdgeCopiedListener((sender, evt) => {
      evt.copy.tag = {
        id: uuidv4(),
        label: null,
        source: evt.copy.sourceNode?.tag?.id,
        target: evt.copy.targetNode?.tag?.id,
        style: evt.copy.tag.style
      };
    })

    // Note: selection is lost here

  }

  private paste() {

    ICommand.PASTE.execute(null, this.graphComponent);
  }


  getNeighbourGraph(node: INode) {
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
        this.graphComponent.graph.inEdgesAt(neighbor).forEach((edge) => {
          jsonGraph.edges.push(edge?.tag)
        })
      } else if (algorithm.traversalDirection === TraversalDirection.PREDECESSOR) {
        this.graphComponent.graph.outEdgesAt(neighbor).forEach((edge) => {
          jsonGraph.edges.push(edge.tag)
        })
      } else {
        this.graphComponent.graph.edgesAt(neighbor).forEach((edge) => {
          const dup = jsonGraph.edges.find(dupEdge => dupEdge?.id === edge.tag.id)
          if (!dup) {
            jsonGraph.edges.push(edge.tag)
          }
        })
      }
    }
    this.originalNeighbourHood = jsonGraph;
    this.createJson();
    this.createGraph(jsonGraph, this.neighbourComponent)
    this.neighbourComponent.contentRect = new Rect(0, 0, 100, 100);
    this.neighbourComponent.fitGraphBounds();
    this.cdr.detectChanges();
  }

  private getNeighbourOption() {
    this.neighboursOptions = [{
      name: 'Neighbourhood', value: TraversalDirection.BOTH
    }, {
      name: 'Successor', value: TraversalDirection.SUCCESSOR
    }, {
      name: 'Predecessor', value: TraversalDirection.PREDECESSOR
    },];
    this.cdr.detectChanges();
  }

  switch(isFullscreen: boolean) {
    if (this.neighbourComponent.graph.nodes.size > 0) {
      this.isFullscreen = isFullscreen;
      if (isFullscreen) {
        this.showDetails = false
        this.graphComponent.graph = this.neighbourComponent.graph;
        this.createGraph(this.original, this.neighbourComponent);
        const inputMode = this.graphComponent.inputMode = new GraphViewerInputMode();
        this.leftClickListener(inputMode)
        this.neighbourComponent.zoomTo(this.neighbourComponent.contentRect);
        ICommand.FIT_GRAPH_BOUNDS.execute(null, this.graphComponent);
      } else {
        this.showDetails = false;
        this.createGraph(this.iGraph, this.graphComponent);
        this.createGraph(this.originalNeighbourHood, this.neighbourComponent);
        this.setNodeInputMode()
        this.neighbourComponent.zoomTo(this.neighbourComponent.contentRect);
        ICommand.FIT_GRAPH_BOUNDS.execute(null, this.graphComponent);
      }
    }
  }

  private getNodeStyleForDragDrop(type: string, style: any) {
    let styleList: any = [];
    if (type === 'shape') {
      style.forEach((shapeStyle: any) => {
        styleList.push(createShapeNodeStyle(shapeStyle))
      });
    } else {
      style.forEach((imageStyle: any) => {
        styleList.push(createIconNode(imageStyle))
      });
    }

    return styleList;
  }
}
