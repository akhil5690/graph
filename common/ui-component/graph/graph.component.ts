import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {
  Arrow,
  ArrowType,
  CircularLayout,
  DefaultLabelStyle,
  EdgesSource,
  ExteriorLabelModel,
  GraphBuilder,
  GraphComponent,
  GraphEditorInputMode,
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
  Size,
  TextWrapping,
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
export class GraphComponents implements OnInit {
  data = data;
  visible = true;
  // data: any;
  openPopUp = false;
  selectedItem!: IEdge | INode | null;
  itemKeys: any;
  itemValues: any;

  constructor(private graphService: GraphService) {
  }

  ngOnInit() {
    // this.graphService.getGraphData().then((data) => {
    //   console.log(data);
    //   this.data = data;
    //   this.createGraph();
    // }).catch(e => console.log(e))
    this.createGraph();
  }

  private createGraph() {
    License.value = licenseValue;
    const graphComponent = new GraphComponent("#graphComponent");
    const builder = new GraphBuilder();

    this.initializeNodeAndEdges(builder);

    this.buildGraph(graphComponent, builder);

    this.zoomOnCtrlClick(graphComponent);

    this.setInputMode(graphComponent);

    this.styleForFraudData(graphComponent);

    this.buildLayout(graphComponent);

    this.initializeOverviewComponent(graphComponent);
  }

  private initializeNodeAndEdges( builder: GraphBuilder) {
    const nodesSource = this.getNodes(builder, {
      data: this.data.nodes,
      id: "id",
      // style: (data:any)=> this.getNodeShape({fill:data.color, shape:'ellipse'})
      labels: ["label"]
    });

    //create edges
    const edgesSource = this.getEdges(builder, {
      data: this.data.edges,
      id: "id",
      labels: ["label"],
      sourceId: "source",
      targetId: "target"
    })

    //style nodes
    nodesSource.nodeCreator.defaults.style = this.getNodeShape({
      stroke: 'green', fill: null, shape: 'ellipse'
    })
    // set node size
    nodesSource.nodeCreator.defaults.size = this.getSize(50, 50)

    // labelWrapping
    nodesSource.nodeCreator.defaults.labels.style = new DefaultLabelStyle({
      maximumSize: this.getSize(100, 15),
      // textWrappingShape: TextWrappingShape.ELLIPSE,
      wrapping: TextWrapping.CHARACTER_ELLIPSIS,
      autoFlip: true,
    })

    nodesSource.nodeCreator.defaults.labels.layoutParameter = this.labelPlacement(ExteriorLabelModel.SOUTH);

    // create icon label
    const iconCreator = nodesSource.nodeCreator.createLabelBinding();
    // null check
    iconCreator.textProvider = node => (node.imageUrl != null ? '' : null)
    iconCreator.styleProvider = node =>
      (new IconLabelStyle({
        icon: node.imageUrl,
        iconSize: new Size(20, 20),
        iconPlacement: InteriorLabelModel.CENTER
      }))

    // style edges
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

  private initializeOverviewComponent(graphComponent: GraphComponent) {
    const overviewComponent = new GraphOverviewComponent('#overview', graphComponent);
    overviewComponent.autoDrag = true;
    graphComponent.viewPoint = new Rect(1000, 1000, 0, 0);
    overviewComponent.contentRect = new Rect(0, 0, 2000, 2000);
    graphComponent.zoom = 0.2;
    overviewComponent.fitContent();
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

  private buildGraph(graphComponent: GraphComponent, builder: GraphBuilder) {
    graphComponent.graph = builder.buildGraph();
  }

  zoomOnCtrlClick(graphComponent: GraphComponent) {
    const containerElement = graphComponent.div;
    containerElement.addEventListener('click', (event: MouseEvent) => {
      // Check if the ctrl key (or cmd key on macOS) is pressed
      const ctrlKey = event.ctrlKey || event.metaKey;

      if (ctrlKey) {
        // Zoom in on click when ctrl/cmd key is pressed
        const zoomFactor = 4;
        const zoomPoint = graphComponent.toWorldCoordinates(new Point(event.clientX, event.clientY));
        graphComponent.zoomTo(zoomPoint, graphComponent.zoom * zoomFactor);
      }
    });
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

  private styleForFraudData(graphComponent: GraphComponent) {
    graphComponent.graph.nodes.forEach((node) => {
      if (node.tag.isFraud) {
        graphComponent.graph.setStyle(node, new ShapeNodeStyle({fill: null, shape: "ellipse", stroke: '#ff1a61'}))
      }
    })
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
    });
    this.leftClickListener(inputMode);

  }

  private leftClickListener(inputMode: GraphEditorInputMode) {
    inputMode.addItemLeftClickedListener((sender, evt) => {
      this.selectedItem = evt.item instanceof IEdge || evt.item instanceof INode ? evt.item : null;
      if (this.selectedItem) {
        console.log(typeof this.selectedItem)
        this.itemKeys = Object.keys(this.selectedItem?.tag);
        this.itemValues = Object.values(this.selectedItem?.tag);
        this.openPopUp = true;
      } else {
        this.openPopUp = false;
      }
    })
  }
}



