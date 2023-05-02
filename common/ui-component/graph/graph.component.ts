import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {
  Arrow,
  ArrowType, DefaultLabelStyle,
  EdgePathLabelModel, ExteriorLabelModel,
  GraphBuilder,
  GraphComponent, IconLabelStyle, IGraph, InteriorLabelModel,
  License,
  PolylineEdgeStyle,
  Rect, ShapeNodeShape,
  ShapeNodeStyle, Size
} from "yfiles";
import licenseValue from 'license.json';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GraphComponents implements OnInit {
  ngOnInit() {
    License.value = licenseValue;
    const graphComponent = new GraphComponent("#graphComponent");
    let data = {
      "nodes": [
        {"id": "1", "label": "", "imageUrl": "../../../../assets/image/user.svg", "x": 100, "y": 100},
        {"id": "2", "label": "AKTTest Role", "x": 300, "y": 100},
        {"id": "3", "label": "AKTTest Role", "x": 300, "y": 300},
        {"id": "4", "label": "Administrator", "x": 300, "y": 500},
        {"id": "5", "label": "Image of Lambdas", "x": 600, "y": 100},
        {"id": "6", "label": "Icon Sage Maker", "x": 600, "y": 300},
        {"id": "7", "x": 800, "y": 100},
        {"id": "8", "label": "Akshay", "x": 600, "y": 500},
      ],
      "edges": [
        {"id": "e1", "source": "1", "target": "2"},
        {"id": "e2", "source": "1", "target": "3"},
        {"id": "e3", "source": "1", "target": "4"},
        {"id": "e4", "label": "Used By", "source": "2", "target": "5"},
        {"id": "e5", "label": "Used By", "source": "2", "target": "6"},
        {"id": "e6", "source": "5", "target": "6"},
        {"id": "e7", "source": "5", "target": "7"},
        {"id": "e8", "label": "Assigned to", "source": "4", "target": "8"},
      ]
    };
    const builder = new GraphBuilder();
    const nodesSource = builder.createNodesSource({
      data: data.nodes,
      id: "id",
      labels: ["label"],
    });
    const edgesSource = builder.createEdgesSource({
      data: data.edges,
      id: "id",
      labels: ["label"],
      sourceId: "source",
      targetId: "target"
    });
    nodesSource.nodeCreator.defaults.shareStyleInstance = false

    nodesSource.nodeCreator.defaults.style = new ShapeNodeStyle({
      // stroke: null, fill: null //for no shape node
      shape: 'ellipse'
    });
    const labelCreator = nodesSource.nodeCreator.createLabelBinding()
// to avoid empty labels to be created return null for missing image URL
    labelCreator.textProvider = node => (node.imageUrl != null ? '' : null)
    labelCreator.styleProvider = node =>
      (new IconLabelStyle({
        icon: node.imageUrl,
        iconSize: new Size(50, 50),
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
        graphComponent.graph.setNodeLayout(node, new Rect(x, y, 150, 90))
        const layout = node.layout
      }
    });

    const nodes = graphComponent.graph.nodes.find(n => n.tag.label === 'Akshay');
    const nodeStyle = new ShapeNodeStyle({
      fill: 'yellow',
      shape: 'ellipse'
    })
    if (nodes) {
      graphComponent.graph.setStyle(nodes, nodeStyle)
    }

    graphComponent.fitGraphBounds()

  }

}
