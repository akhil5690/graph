import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {
  DefaultLabelStyle,
  DragDropEffects,
  EdgePathLabelModel,
  EdgeSides,
  ExteriorLabelModel, GraphBuilder,
  GraphComponent,
  GraphEditorInputMode,
  GroupNodeLabelModel,
  GroupNodeStyle, ICommand, IEdge,
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
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-graph-editor',
  templateUrl: './graph-editor.component.html',
  styleUrls: ['./graph-editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GraphEditorComponent implements OnInit, OnChanges {
  private graphComponent!: GraphComponent;
  @Input() data: any;
  @ViewChild('graphContainer', {static: true}) graphContainer!: ElementRef;
  @ViewChild('panel', {static: true}) panelContainer!: ElementRef;
  isFilterOpen: boolean = false;
  toolBarItems = [{
    toolName: 'save',
    icon: 'assets/image/save.svg'
  }, {
    toolName: 'undo',
    icon: 'assets/image/undo.svg'
  }, {
    toolName: 'redo',
    icon: 'assets/image/redo.svg'
  }
  ]
  selectedItem: any;

  private max = 1000000;
  private min = 0;
  isItemClicked!: boolean;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnChanges() {
  }

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
    this.leftClickListener(inputMode);

    this.onTagChange(inputMode)
    this.initializeDragAndDropPanel();
  }

  private leftClickListener(inputMode: GraphEditorInputMode) {
    inputMode.addItemLeftClickedListener((sender, evt) => {
      this.isItemClicked = true;
      this.selectedItem = evt.item instanceof IEdge || evt.item instanceof INode ? evt.item : null;
    })
  }

  onTagChange(inputMode: GraphEditorInputMode) {
    this.graphComponent.graph.addEdgeTagChangedListener(this.triggerSave);
    this.graphComponent.graph.addNodeTagChangedListener(this.triggerSave);
    inputMode.addDeletedItemListener(this.triggerSave)
  }

  triggerSave = (sender: any, evt: any) => {
    this.save();
  }

  nodeListener(inputMode: GraphEditorInputMode) {
    inputMode.addNodeCreatedListener((sender, evt) => {
      if (evt.item.style instanceof GroupNodeStyle) {
        console.log('is group')
      }
      evt.item.tag = {id: uuidv4().toString()};
      this.graphComponent.graph.nodes.append(evt.item);
    })
  }

  labelListener(inputMode: GraphEditorInputMode) {
    inputMode.addLabelAddedListener(this.getLabelListner);

    inputMode.addLabelTextChangedListener(this.getLabelListner);
  }

  getLabelListner = (sender: any, evt: { item: any; }) => {
    const label = evt.item;
    const owner = label.owner;
    if (owner instanceof INode) {
      owner.tag = {id: owner.tag.id, label: label.text};
    } else if (owner instanceof IEdge) {
      owner.tag = {
        id: owner.tag.id,
        source: owner.tag.source,
        target: owner.tag.target,
        label: label.text
      };
    }
  }


  edgeListener(inputMode: GraphEditorInputMode) {
    inputMode.createEdgeInputMode.addEdgeCreatedListener((sender, evt) => {
      const edge = evt.item;
      const sourceNode = edge.sourceNode;
      const targetNode = edge.targetNode;
      edge.tag = {
        id: uuidv4().toString(),
        source: sourceNode?.tag?.id,
        target: targetNode?.tag?.id
      };
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
    const builder = new GraphBuilder()
    const initGraph = {
      "nodes": [
        {
          "id": "e3034993-a309-4dcd-8360-e8b6672a2b8e",
          "label": "movie"
        },
        {
          "id": "824f0d0d-d720-47ed-8ba9-b81c71b7715f",
          "label": "person"
        }
      ],
      "edges": [
        {
          "id": "60a56245-b447-4ef3-8979-943bc2eb6823",
          "source": "824f0d0d-d720-47ed-8ba9-b81c71b7715f",
          "target": "e3034993-a309-4dcd-8360-e8b6672a2b8e"
        }
      ]
    }

    const sourceNode = builder.createNodesSource({
      data: initGraph.nodes, id: "id", labels: ['label']
    });

    const edgeNode = builder.createEdgesSource({
      data: initGraph.edges, id: "id", labels: ['label'], sourceId: "source", targetId: "target"
    })

    this.graphComponent.graph = builder.buildGraph();
    this.graphComponent.graph.undoEngineEnabled = true;
    this.graphComponent.fitGraphBounds()
  }

  setFrame(isFilterOpen: boolean) {
    this.isFilterOpen = isFilterOpen;
  }

  clickEvent(tool: { icon: string; toolName: string }) {
    if (this.graphComponent) {
      switch (tool.toolName) {
        case 'save':
          this.save();
          break;
        case 'undo':
          ICommand.UNDO.execute(null, this.graphComponent)
          break;
        case 'redo':
          ICommand.REDO.execute(null, this.graphComponent)
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

  changeEdgeNode(property: any) {
    console.log(property)
  }
}
