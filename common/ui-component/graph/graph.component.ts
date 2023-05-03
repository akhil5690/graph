import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {
  Arrow,
  ArrowType, BalloonLayout, DefaultLabelStyle,
  GraphBuilder,
  GraphComponent, IconLabelStyle, InteriorLabelModel,
  License,
  PolylineEdgeStyle,
  Rect,
  ShapeNodeStyle, Size,
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
    const nodesSource = builder.createNodesSource({
      data: data.nodes,
      id: "id",
      // labels: ["label"],
    });
    const edgesSource = builder.createEdgesSource({
      data: data.edges,
      id: "id",
      labels: ["label"],
      sourceId: "source",
      targetId: "target"
    });

    nodesSource.nodeCreator.defaults.style = new ShapeNodeStyle({
      stroke: null, fill: null //for no shape node
      // shape: 'ellipse'
    });
    //
    const labelCreator = nodesSource.nodeCreator.createLabelBinding(data => data.label);
    labelCreator.defaults.layoutParameter = InteriorLabelModel.SOUTH
    const iconCreator = nodesSource.nodeCreator.createLabelBinding()
// to avoid empty labels to be created return null for missing image URL
    iconCreator.textProvider = node => (node.imageUrl != null ? '' : null)
    iconCreator.styleProvider = node =>
      (new IconLabelStyle({
        icon: node.imageUrl,
        iconSize: new Size(20, 20),
        iconPlacement: InteriorLabelModel.CENTER
      }))


    edgesSource.edgeCreator.defaults.style = new PolylineEdgeStyle({
      stroke: "black",
      targetArrow: new Arrow({
        type: ArrowType.TRIANGLE,
        fill: "black"
      })
    });
    edgesSource.edgeCreator.defaults.labels.style = new DefaultLabelStyle({
      backgroundFill: 'white'
    })
    graphComponent.graph = builder.buildGraph();
    graphComponent.graph.nodes.forEach(node => {
      // console.log(graphComponent.graph.nodes.get(7))
      const x = data.nodes.find(n => n.id === node.tag.id)?.x;
      const y = data.nodes.find(n => n.id === node.tag.id)?.y;
      if (x !== undefined && y !== undefined) {
        graphComponent.graph.setNodeLayout(node, new Rect(x, y, 50, 50))
        const layout = node.layout
      }
    });

    const nodes = graphComponent.graph.nodes.find(n => n.tag.label === 'Akshay');
    const nodeStyle = new ShapeNodeStyle({
      // fill: 'yellow',
      // shape: 'ellipse'
      stroke:null,
      fill:null
    })
    if (nodes) {
      graphComponent.graph.setStyle(nodes, nodeStyle)
    }


  }


}
