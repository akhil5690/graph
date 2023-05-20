import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {
  Arrow,
  ArrowType,
  CircularLayout,
  DefaultLabelStyle,
  EdgesSource,
  GraphBuilder,
  GraphComponent,
  GraphEditorInputMode,
  GraphItemTypes,
  GraphOverviewComponent,
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
  OrganicLayout,
  Point,
  PolylineEdgeStyle,
  Rect,
  ShapeNodeStyle,
  Size
} from "yfiles";
import {data} from './data'
import licenseValue from 'license.json';
import {GraphService} from "../../ui-services/graph/graph.service";

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GraphComponents implements OnInit{
  data = data;
  visible = true;
  // data: any;
  graphComponent: any;
  selectedItem!: IEdge | INode | null;
  // @Input() data: any;
  @Output() sidebarDetails = new EventEmitter();

  constructor(private graphService: GraphService) {
  }

  ngOnInit() {

    this.createGraph();
  }

  // ngOnChanges() {
  //   if (this.data) {
  //     this.createGraph();
  //   }
  // }

  private createGraph() {
    License.value = licenseValue;
    const builder = new GraphBuilder();
    this.graphComponent = new GraphComponent("#graphComponent");

    this.initializeNodeAndEdges(builder);

    this.buildGraph(this.graphComponent, builder);

    this.zoomOnCtrlClick(this.graphComponent);

    this.setInputMode(this.graphComponent);

    this.styleForFraudData(this.graphComponent);

    this.buildLayout(this.graphComponent);

    setTimeout(() => {
      this.graphComponent.zoomTo(this.graphComponent.contentRect);
    }, 50)

    this.initializeOverviewComponent(this.graphComponent);
  }

  private initializeNodeAndEdges(builder: GraphBuilder) {
    const nodesSource = this.getNodes(builder, {
      data: this.data.nodes,
      id: "id",
      // style: (data:any)=> this.getNodeShape({fill:data.color, shape:'ellipse'})
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

    this.styleNode(nodesSource);
    // create icon label
    this.styleIconLabel(nodesSource);
    // style edges
    this.styleEdge(edgesSource);
  }

  private styleNode(nodesSource: NodesSource<any>) {
    //style nodes
    nodesSource.nodeCreator.defaults.style = this.getNodeShape({
      stroke: null, fill: null, shape: 'ellipse'
    })
    // set node size
    nodesSource.nodeCreator.defaults.size = this.getSize(50, 50)

  }

  private styleIconLabel(nodesSource: NodesSource<any>) {
    const labelCreator = this.createLabel(nodesSource);
    labelCreator.defaults.layoutParameter = this.labelPlacement(InteriorLabelModel.SOUTH);
    const iconCreator = nodesSource.nodeCreator.createLabelBinding();
    // null check
    iconCreator.textProvider = node => (node.imageUrl != null ? '' : null)
    iconCreator.styleProvider = node =>
      (new IconLabelStyle({
        icon: node.imageUrl,
        iconSize: new Size(20, 20),
        iconPlacement: InteriorLabelModel.CENTER
      }))

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

  }

  private buildGraph(graphComponent: GraphComponent, builder: GraphBuilder) {
    graphComponent.graph = builder.buildGraph();
    graphComponent.fitContent();
    graphComponent.fitGraphBounds();

  }

  zoomOnCtrlClick(graphComponent: GraphComponent) {
    const containerElement = graphComponent.div;
    containerElement.addEventListener('click', (event: MouseEvent) => {
      // Check if the ctrl key (or cmd key on macOS) is pressed
      const ctrlKey = event.ctrlKey;
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
      this.sidebarDetails.emit(this.selectedItem);
    })
  }

  private styleForFraudData(graphComponent: GraphComponent) {
    graphComponent.graph.nodes.forEach((node) => {
      if (node.tag.isFraud) {
        graphComponent.graph.setStyle(node, new ShapeNodeStyle({fill: null, shape: "ellipse", stroke: '#ff1a61'}))
      }
    })
  }


  private buildLayout(graphComponent: GraphComponent) {
    // const layout = this.prepareLayout();
    const layout = new OrganicLayout({minimumNodeDistance: 70, nodeEdgeOverlapAvoided: true});
    // const layout = new CircularLayout({});

    const layoutExecutor = this.getLayoutExecutor({
      graphComponent: graphComponent,
      layout: layout,
      duration: '0.5s',
    })
    layoutExecutor.start().then();
  }

  private initializeOverviewComponent(graphComponent: GraphComponent) {
    const overviewComponent = new GraphOverviewComponent('#overview', graphComponent);
    overviewComponent.autoDrag = true;
    overviewComponent.contentRect = new Rect(0, 0, 2000, 2000);
    graphComponent.zoom = 0.2;
    overviewComponent.fitContent();
  }

  toggle() {
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

  private prepareLayout(): CircularLayout {
    return new CircularLayout();
  }

  private getLayoutExecutor(options: any): LayoutExecutor {
    return new LayoutExecutor(options);
  }

  private getNode(graphComponent: GraphComponent, label: string) {
    return graphComponent.graph.nodes.find(n => n.tag.label === label);
  }


  // zoomIn() {
  //   zoomfactor = 2
  //   graphComponent.zoomTo(graphComponent.center, graphComponent.zoom * zoomFactor)
  //
  // }
  zooIn() {
    const zoomFactor = 2;
    this.graphComponent.zoomTo(this.graphComponent.center, this.graphComponent.zoom * zoomFactor);
  }

  zoomOut() {
    const zoomFactor = 0.6;
    this.graphComponent.zoomTo(this.graphComponent.center, this.graphComponent.zoom * zoomFactor);
  }

  fitcontent() {
    this.graphComponent.zoomTo(this.graphComponent.contentRect);
  }
}



