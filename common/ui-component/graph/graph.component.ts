import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Arrow, ArrowType, GraphBuilder, GraphComponent, License, PolylineEdgeStyle, Rect, ShapeNodeStyle} from "yfiles";
import licenseValue from 'license.json';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class GraphComponents  implements OnInit{
  ngOnInit() {
    License.value = licenseValue;
    const graphComponent = new GraphComponent("#graphComponent");
    let data = {
      "nodes": [
        {"id": "1", "label": "1", "x": 100, "y": 100},
        {"id": "2", "label": "2", "x": 300, "y": 100},
        {"id": "3", "label": "3", "x": 200, "y": 200}
      ],
      "edges": [
        {"id": "e1", "source": "1", "target": "2"},
        {"id": "e2", "source": "2", "target": "3"},
        {"id": "e3", "source": "3", "target": "1"}
      ]
    };

    // let data = {
    //   "nodes": [
    //     {"id": "1", "label": "1" },
    //     {"id": "2", "label": "2"},
    //     {"id": "3", "label": "3"},
    //     {"id": "4", "label": "2"},
    //     {"id": "5", "label": "3"},
    //     {"id": "6", "label": "2"},
    //     {"id": "7", "label": "3"}
    //   ],
    //   "edges": [
    //     {"id": "e1", "source": "1", "target": "2"},
    //     {"id": "e2", "source": "1", "target": "3"},
    //     {"id": "e3", "source": "1", "target": "4"},
    //     {"id": "e4", "source": "1", "target": "5"},
    //     {"id": "e5", "source": "1", "target": "6"},
    //     {"id": "e6", "source": "1", "target": "7"},
    //     {"id": "e7", "source": "6", "target": "7"},
    //   ]
    // };
    const builder = new GraphBuilder();
    const nodesSource = builder.createNodesSource({
      data: data.nodes,
      id: "id",
      labels: ["label"]
    });
    const edgesSource = builder.createEdgesSource({
      data: data.edges,
      id: "id",
      sourceId: "source",
      targetId: "target"
    });
    nodesSource.nodeCreator.defaults.style = new ShapeNodeStyle({
      shape: "round-rectangle",
      fill: "orange"
    });
    edgesSource.edgeCreator.defaults.style = new PolylineEdgeStyle({
      stroke: "blue",
      targetArrow: new Arrow({
        type: ArrowType.TRIANGLE,
        fill: "blue"
      })
    });

    graphComponent.graph = builder.buildGraph();
    // const layout = new RadialLayout()
    // const layoutData = new RadialLayoutData()
    // layoutData.centerNodes = [graphComponent.graph.nodes.first()]
    // const adapter = new LayoutGraphAdapter(graphComponent.graph)
    // adapter.applyLayout(layout,layoutData)
    // graphComponent.inputMode = new GraphEditorInputMode()
    // graphComponent.fitGraphBounds()
    graphComponent.graph.nodes.forEach(node => {
      const x = data.nodes.find(n => n.id === node.tag.id)?.x;
      const y = data.nodes.find(n => n.id === node.tag.id)?.y;
      if (x !== undefined && y !== undefined) {
        graphComponent.graph.setNodeLayout(node, new Rect(x, y, node.layout.width, node.layout.height))
        const layout = node.layout
      }
    });
    graphComponent.fitGraphBounds()

  }

}
