import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {
  DefaultLabelStyle,
  DragDropEffects,
  EdgePathLabelModel,
  EdgeSides,
  ExteriorLabelModel,
  GraphComponent,
  GraphEditorInputMode,
  GroupNodeLabelModel,
  GroupNodeStyle, IEdge,
  IGraph,
  INode,
  Insets,
  License,
  NodeDropInputMode,
  Point,
  QueryContinueDragEventArgs,
  Rect,
  ShapeNodeShape,
  SimpleNode,
  Size,
  SvgExport
} from "yfiles";
import licenseValue from "../../../license.json";
import {addClass, createDemoGroupStyle, createShapeNodeStyle, initDemoStyles, removeClass} from "./demo-styles";

@Component({
  selector: 'app-graph-editor',
  templateUrl: './graph-editor.component.html',
  styleUrls: ['./graph-editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GraphEditorComponent implements OnInit {
  private graphComponent!: GraphComponent;
  @ViewChild('graphContainer', {static: true}) graphContainer!: ElementRef;
  @ViewChild('panel', {static: true}) panelContainer!: ElementRef;
  isFilterOpen: boolean = false;
  toolBarItems = [{
    toolName: 'Save',
    icon: 'assets/image/overview.svg'
  }
  ]

  ngOnInit() {
    this.run();
  }

  run() {
    License.value = licenseValue;
    const divElement = this.graphContainer.nativeElement;
    this.graphComponent = new GraphComponent(divElement);
    this.graphComponent.inputMode = new GraphEditorInputMode({
      allowGroupingOperations: true
    })
    this.graphComponent.graph.undoEngineEnabled = true
    this.initTutorialDefaults(this.graphComponent.graph)
    this.createGraph()
    this.configureDragAndDrop()
  }

  configureDragAndDrop(): void {
    const inputMode = this.graphComponent.inputMode = new GraphEditorInputMode()
    const nodeDropInputMode = inputMode.nodeDropInputMode
    nodeDropInputMode.enabled = true
    nodeDropInputMode.isGroupNodePredicate = (draggedNode: INode): boolean =>
      draggedNode.style instanceof GroupNodeStyle
    nodeDropInputMode.showPreview = true
    this.nodeListener(inputMode);
    this.edgeListener(inputMode);
    this.labelListener(inputMode);
    this.initializeDragAndDropPanel();
  }

  nodeListener(inputMode: GraphEditorInputMode) {
    inputMode.addNodeCreatedListener((sender, evt) => {
      evt.item.tag = {id: Math.random()};
      this.graphComponent.graph.nodes.append(evt.item);
    })
  }

  labelListener(inputMode: GraphEditorInputMode) {
    inputMode.addItemDoubleClickedListener((sender, evt) => {
      inputMode.addLabelAddedListener((sender, evt) => {
        if (evt.owner instanceof INode) {
          evt.owner.tag = {id: evt.owner.tag.id, label: evt.item.text};
        }
        if (evt.owner instanceof IEdge) {
          evt.owner.tag = {
            id: evt.owner.tag.id,
            source: evt.owner.tag.source,
            target: evt.owner.tag.target,
            label: evt.item.text
          };

        }
      })
    })
  }

  edgeListener(inputMode: GraphEditorInputMode) {
    inputMode.createEdgeInputMode.addEdgeCreatedListener((sender, evt) => {
      const edge = evt.item;
      const sourceNode = edge.sourceNode;
      const targetNode = edge.targetNode;
      edge.tag = {id: Math.random(), source: sourceNode?.tag?.id, target: targetNode?.tag?.id};
      this.graphComponent.graph.edges.append(edge);
    })
  }

  initializeDragAndDropPanel(): void {
    const panel = this.panelContainer.nativeElement
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
    const nodeStyles = [defaultNode, ellipse, rectangle, fatArrow, fatArrow2, hexagon, hexagon2, diamond, defaultGroupNodeStyle, newGroup]
    nodeStyles.forEach((style: any): void => {
      this.addNodeVisual(style, panel)
    })
  }

  createNodeVisual(style: any): string {
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
    const div = document.createElement('div')
    div.setAttribute('style', 'width: 40px; height: 40px; margin: 10px auto; cursor: grab;')
    const img = document.createElement('img')
    img.setAttribute('style', 'width: auto; height: auto;')
    img.setAttribute('src', this.createNodeVisual(style))

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
    )
    div.appendChild(img)
    panel.appendChild(div)
  }

  initTutorialDefaults(graph: IGraph): void {
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

  createGraph(): void {
    const graph = this.graphComponent.graph
    const node1 = graph.createNodeAt([110, 20])
    node1.tag = {id: 1, label: 'Node 1'};
    const node2 = graph.createNodeAt([145, 95])
    node2.tag = {id: 2, label: 'Node 2'};
    const node3 = graph.createNodeAt([75, 95])
    node3.tag = {id: 3, label: 'Node 3'};
    const node4 = graph.createNodeAt([30, 175])
    node4.tag = {id: 4, label: 'Node 4'};
    const node5 = graph.createNodeAt([100, 175])
    node5.tag = {id: 5, label: 'Node 5'};
    const groupnode1 = graph.groupNodes({children: [node1, node2, node3], labels: ['Group 1']});
    const edge1 = graph.createEdge(node1, node2);
    edge1.tag = {id: 1, source: 1, target: 2}
    const edge2 = graph.createEdge(node1, node3);
    edge2.tag = {id: 2, source: 1, target: 3}
    const edge3 = graph.createEdge(node3, node4)
    edge3.tag = {id: 3, source: 3, target: 4}

    const edge4 = graph.createEdge(node3, node5);
    edge4.tag = {id: 4, source: 3, target: 5}

    const edge5 = graph.createEdge(node1, node5);
    edge5.tag = {id: 5, source: 1, target: 5}

    graph.setPortLocation(edge1.sourcePort!, new Point(123.33, 40))
    graph.setPortLocation(edge1.targetPort!, new Point(145, 75))
    graph.setPortLocation(edge2.sourcePort!, new Point(96.67, 40))
    graph.setPortLocation(edge2.targetPort!, new Point(75, 75))
    graph.setPortLocation(edge3.sourcePort!, new Point(65, 115))
    graph.setPortLocation(edge3.targetPort!, new Point(30, 155))
    graph.setPortLocation(edge4.sourcePort!, new Point(85, 115))
    graph.setPortLocation(edge4.targetPort!, new Point(90, 155))
    graph.setPortLocation(edge5.sourcePort!, new Point(110, 40))
    graph.setPortLocation(edge5.targetPort!, new Point(110, 155))
    graph.addBends(edge1, [new Point(123.33, 55), new Point(145, 55)])
    graph.addBends(edge2, [new Point(96.67, 55), new Point(75, 55)])
    graph.addBends(edge3, [new Point(65, 130), new Point(30, 130)])
    graph.addBends(edge4, [new Point(85, 130), new Point(90, 130)])

    this.graphComponent.fitGraphBounds()
  }

  setFrame(isFilterOpen: boolean) {
    this.isFilterOpen = isFilterOpen;
  }

  clickEvent(tool: { icon: string; toolName: string }) {
    if (this.graphComponent) {
      switch (tool.toolName) {
        case 'Save':
          this.save();
          break;
      }
    }
  }

  save() {
    const jsonGraph: { nodes: any[], edges: any[] } = {
      nodes: [],
      edges: []
    };
    this.graphComponent.graph.nodes.forEach((node) => {
      const jsonNode = {
        id: node?.tag?.id,
        label: node?.tag?.label,
      };
      jsonGraph.nodes.push(jsonNode);
    });
    this.graphComponent.graph.edges.forEach((edge) => {
      const jsonEdge = {
        id: edge?.tag?.id,
        source: edge?.tag?.source,
        target: edge?.tag?.target,
        label: edge?.tag?.label
        // Include other edge properties as needed
      };
      jsonGraph.edges.push(jsonEdge);
    });

    console.log(jsonGraph)
  }
}
