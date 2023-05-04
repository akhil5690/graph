import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {
  Arrow,
  ArrowType,
  BalloonLayout,
  DefaultLabelStyle,
  GraphBuilder,
  GraphComponent,
  GraphOverviewComponent,
  IconLabelStyle,
  InteriorLabelModel,
  LayoutExecutor,
  License,
  PolylineEdgeStyle,
  Rect,
  ShapeNodeStyle,
  Size,
} from "yfiles";
import licenseValue from 'license.json';
import {data} from "./data";

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GraphComponents implements OnInit {
  data = data;

  ngOnInit() {
    License.value = licenseValue;
    const graphComponent = new GraphComponent("#graphComponent");
    const builder = new GraphBuilder();

    //create nodes
    const nodesSource = builder.createNodesSource({
      data: data.nodes,
      id: "id",
      // labels: ["label"],
    });

    //create edges
    const edgesSource = builder.createEdgesSource({
      data: data.edges,
      id: "id",
      labels: ["label"],
      sourceId: "source",
      targetId: "target"
    });

    //style nodes
    nodesSource.nodeCreator.defaults.style = new ShapeNodeStyle({
      stroke: null, fill: null //for no shape node
      // shape: 'ellipse'
    });
    // set node size
    nodesSource.nodeCreator.defaults.size = new Size(50, 50);

    //create text label
    const labelCreator = nodesSource.nodeCreator.createLabelBinding(data => data.label);
    labelCreator.defaults.layoutParameter = InteriorLabelModel.SOUTH;
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
    edgesSource.edgeCreator.defaults.style = new PolylineEdgeStyle({
      stroke: "black",
      targetArrow: new Arrow({
        type: ArrowType.TRIANGLE,
        fill: "black"
      })
    });

    // style edge label
    edgesSource.edgeCreator.defaults.labels.style = new DefaultLabelStyle({
      backgroundFill: 'white'
    })
    //prepare the graph
    graphComponent.graph = builder.buildGraph();

    // create layout
    const layout = new BalloonLayout({minimumNodeDistance:50});
    const layoutExecutor = new LayoutExecutor({
      graphComponent:graphComponent,
      layout: layout,
      duration: '0.5s',

    });
    layoutExecutor.start().then();
    //place the nodes
    // graphComponent.graph.nodes.forEach(node => {
    //   // console.log(graphComponent.graph.nodes.get(7))
    //   const x = data.nodes.find(n => n.id === node.tag.id)?.x;
    //   const y = data.nodes.find(n => n.id === node.tag.id)?.y;
    //   if (x !== undefined && y !== undefined) {
    //     graphComponent.graph.setNodeLayout(node, new Rect(x, y, 50, 50))
    //     const layout = node.layout
    //   }
    // });

    // customise one node style
    const nodes = graphComponent.graph.nodes.find(n => n.tag.label === 'Akshay');
    const nodeStyle = new ShapeNodeStyle({
      // fill: 'yellow',
      // shape: 'ellipse'
      stroke: null,
      fill: null
    })
    if (nodes) {
      graphComponent.graph.setStyle(nodes, nodeStyle)
    }

    this.initializeOverviewComponent(graphComponent)

  }


  private initializeOverviewComponent(graphComponent: GraphComponent ) {

    const overviewComponent = new GraphOverviewComponent('#overview', graphComponent);
    overviewComponent.autoDrag = true;
    overviewComponent.contentRect = new Rect(0,0,1000,1000)
    overviewComponent.fitContent(true).then();
  }
}
