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
  IEdgeStyle,
  ILabelModelParameter,
  ILabelStyle,
  INode,
  INodeStyle,
  InteriorLabelModel,
  LabelCreator,
  LayoutExecutor,
  License,
  NodesSource, Point,
  PolylineEdgeStyle,
  Rect,
  ShapeNodeStyle,
  Size,
  TextWrapping,
} from "yfiles";
import {data} from './data'
import licenseValue from 'license.json';
import {HttpClient} from "@angular/common/http";
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

    this.initializeNodeAndEdges(graphComponent, builder);

    this.buildGraph(graphComponent, builder);

    this.buildLayout(graphComponent);

    this.initializeOverviewComponent(graphComponent);
  }

  private initializeNodeAndEdges(graphComponent: GraphComponent, builder: GraphBuilder) {
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
    graphComponent.viewPoint = new Point(-200,0)
    overviewComponent.contentRect = new Rect(0, 0, 1000, 1000)
    overviewComponent.fitContent(true).then();
  }

  private buildLayout(graphComponent: GraphComponent) {
    const layout = this.prepareLayout();
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
    graphComponent.fitContent()
    // graphComponent.graph.nodes.forEach((node)=>{
    //   if (node.tag.isFraud){
    //     const res = graphComponent.graph.edges.filter((edge) => node.tag.id === edge.tag.sourceId);
    //     console.log(res);
    //     res.forEach((edge) => {
    //       // edge.style = new PolylineEdgeStyle()
    //     })}
    //
    // })
    graphComponent.graph.nodes.forEach((node) => {
      if (node.tag.isFraud) {
        graphComponent.graph.setStyle(node, new ShapeNodeStyle({fill: null, shape: "ellipse", stroke: '#ff1a61'}))
      }
    })
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
    inputMode.addItemLeftClickedListener((sender, evt) => {
      const node = evt.item instanceof INode ? evt.item : null;
      if (node && node.tag.isFraud) {
        this.openPopUp = true;
      } else {
        this.openPopUp = false;
      }
    })
  }

  private prepareLayout(): CircularLayout {
    return new CircularLayout({nodeLabelingPolicy: "ray-like-leaves"});
  }

  private getLayoutExecutor(options: any): LayoutExecutor {
    return new LayoutExecutor(options);
  }

  private getNode(graphComponent: GraphComponent, label: string) {
    return graphComponent.graph.nodes.find(n => n.tag.label === label);
  }

}



