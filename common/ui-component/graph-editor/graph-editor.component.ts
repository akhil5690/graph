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
  GroupNodeStyle,
  IGraph, ImageNodeStyle,
  INode,
  INodeStyle,
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
import {
  addClass,
  applyDemoTheme,
  createDemoGroupStyle, createIconNode,
  createShapeNodeStyle,
  initDemoStyles,
  removeClass
} from "./demo-styles";

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

  ngOnInit() {
    this.run();
  }

  run() {
    License.value = licenseValue;
    const divElement = this.graphContainer.nativeElement;
    this.graphComponent = new GraphComponent(divElement);
    applyDemoTheme(this.graphComponent)
    this.graphComponent.inputMode = new GraphEditorInputMode({
      allowGroupingOperations: true
    })
    this.graphComponent.graph.undoEngineEnabled = true

    // configures default styles for newly created graph elements
    this.initTutorialDefaults(this.graphComponent.graph)

    // add a sample graph
    this.createGraph()

    // configure drag and drop
    this.configureDragAndDrop()
    // this.graphComponent.graph = builder.buildGraph()
    // bind the buttons to their commands
    // registerCommands()

    // initialize the application's CSS and JavaScript for the description
    // showApp(this.graphComponent)
  }

  configureDragAndDrop(): void {
    // Obtain the input mode for handling dropped nodes from the GraphEditorInputMode.
    const nodeDropInputMode = (this.graphComponent.inputMode as GraphEditorInputMode).nodeDropInputMode
    // By default the mode available in GraphEditorInputMode is disabled, so first enable it.
    nodeDropInputMode.enabled = true
    // Certain nodes should be created as group nodes. In this case we distinguish them by their style.
    nodeDropInputMode.isGroupNodePredicate = (draggedNode: INode): boolean =>
      draggedNode.style instanceof GroupNodeStyle
    // When dragging the node within the GraphComponent, we want to show a preview of that node.
    nodeDropInputMode.showPreview = true

    this.initializeDragAndDropPanel();
  }

  /**
   * Initializes the palette of nodes that can be dragged to the graph component.
   */
  initializeDragAndDropPanel(): void {
    // retrieve the panel element
    const panel = this.panelContainer.nativeElement

    // prepare node styles for the palette
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

    // add a visual for each node style to the palette
    nodeStyles.forEach((style: any): void => {
      this.addNodeVisual(style, panel)
    })
  }

  createNodeVisual(style: any): string {
    // another GraphComponent is utilized to export a visual of the given style
    const exportComponent = new GraphComponent()
    const exportGraph = exportComponent.graph
    // we create a node in this GraphComponent that should be exported as SVG
    exportGraph.createNode(new Rect(0, 0, 40, 40), style)
    exportComponent.updateContentRect(new Insets(5))

    // the SvgExport can export the content of any GraphComponent
    const svgExport = new SvgExport(exportComponent.contentRect)
    const svg = svgExport.exportSvg(exportComponent)
    const svgString = SvgExport.exportSvgString(svg)
    return SvgExport.encodeSvgDataUrl(svgString)
  }

  addNodeVisual(style: any, panel: Element): void {
    // Create the HTML element for the visual.
    const div = document.createElement('div')
    div.setAttribute('style', 'width: 40px; height: 40px; margin: 10px auto; cursor: grab;')
    const img = document.createElement('img')
    img.setAttribute('style', 'width: auto; height: auto;')
    // Create a visual for the style.
    img.setAttribute('src', this.createNodeVisual(style))

    const startDrag = (): void => {
      // Create preview node with which the GraphComponent can render a preview during the drag gesture.
      const simpleNode = new SimpleNode()
      simpleNode.layout = new Rect(0, 0, 40, 40)
      simpleNode.style = style.clone()

      // We also want to show a preview of dragged node, while the dragging is not within the GraphComponent.
      // For this, we can provide an element that will be placed at the mouse position during the drag gesture.
      // Of course, this should resemble the node that is currently dragged.
      const dragPreview = document.createElement('div')
      dragPreview.appendChild(img.cloneNode(true))

      // The core method that initiates a drag which is recognized by the GraphComponent.
      const dragSource = NodeDropInputMode.startDrag(
        div, // The source of the drag gesture, i.e. the element in the drag and drop panel.
        simpleNode, // The node that is dragged. This is used to provide a preview within the GC during the drag.
        DragDropEffects.ALL, // The allowed actions for this drag.
        true, // Whether to the cursor during the drag.
        dragPreview // The optional preview element that is shown outside of the GC during the drag.
      )

      // Within the GraphComponent, it draws its own preview node. Therefore, we need to hide the additional
      // preview element that is used outside of the GraphComponent.
      // The GraphComponent uses its own preview node to support features like snap lines or snapping of the dragged node.
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
    // set styles that are the same for all tutorials
    initDemoStyles(graph)

    // set the style, label and label parameter for group nodes
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

    // set sizes and locations specific for this tutorial
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
    const node2 = graph.createNodeAt([145, 95])
    const node3 = graph.createNodeAt([75, 95])
    const node4 = graph.createNodeAt([30, 175])
    const node5 = graph.createNodeAt([100, 175])

    graph.groupNodes({children: [node1, node2, node3], labels: ['Group 1']})

    const edge1 = graph.createEdge(node1, node2)
    const edge2 = graph.createEdge(node1, node3)
    const edge3 = graph.createEdge(node3, node4)
    const edge4 = graph.createEdge(node3, node5)
    const edge5 = graph.createEdge(node1, node5)
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
    graph.undoEngine!.clear()
  }

  setFrame(isFilterOpen: boolean) {
    this.isFilterOpen = isFilterOpen;
  }
}
