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
  ExteriorLabelModel,
  GraphBuilder,
  GraphComponent,
  GraphEditorInputMode,
  GroupNodeLabelModel,
  GroupNodeStyle,
  ICommand,
  IEdge,
  IGraph,
  INode,
  Insets,
  License,
  NodeDropInputMode,
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
  selector: 'cym-graph-editor',
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
    icon: 'assets/image/save.svg',
    height: 20, width: 20

  }, {
    toolName: 'refresh',
    icon: 'assets/image/refresh.svg',
    height: 20, width: 20
  }, {
    toolName: 'zoomIn',
    icon: 'assets/image/zoomIn.svg',
    height: 20, width: 20
  }, {
    toolName: 'zoomOut',
    icon: 'assets/image/zoomOut.svg',
    height: 20, width: 20
  }, {
    toolName: 'undo',
    icon: 'assets/image/undo.svg',
    height: 15, width: 15
  }, {
    toolName: 'redo',
    icon: 'assets/image/redo.svg',
    height: 15, width: 15
  },
    {
      toolName: 'fit',
      icon: 'assets/image/fullscreen.svg',
      height: 15, width: 15
    }, {
      toolName: 'cut',
      icon: 'assets/image/cut.svg',
      height: 15, width: 15
    }, {
      toolName: 'copy',
      icon: 'assets/image/copy.svg',
      height: 15, width: 15
    }, {
      toolName: 'paste',
      icon: 'assets/image/paste.svg',
      height: 15, width: 15

    }

  ]
  selectedItem: any;

  private max = 1000000;
  private min = 0;
  isItemClicked!: boolean;
  iGraph: any = {};

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
    this.initializeDragAndDropPanel();
  }

  private leftClickListener(inputMode: GraphEditorInputMode) {
    inputMode.addItemLeftClickedListener((sender, evt) => {
      this.isItemClicked = true;
      this.selectedItem = evt.item instanceof IEdge || evt.item instanceof INode ? evt.item : null;
    })
  }

  nodeListener(inputMode: GraphEditorInputMode) {
    inputMode.addNodeCreatedListener((sender, evt) => {
      if (evt.item.style instanceof GroupNodeStyle) {
        console.log('is group')
      }
      evt.item.tag = {id: uuidv4().toString(), style: evt.item.style, layout: evt.item.layout};
      this.graphComponent.graph.nodes.append(evt.item);
    });
  }

  labelListener(inputMode: GraphEditorInputMode) {
    inputMode.addLabelAddedListener(this.getLabelListner);

    inputMode.addLabelTextChangedListener(this.getLabelListner);
  }

  getLabelListner = (sender: any, evt: { item: any; }) => {
    const label = evt.item;
    const owner = label.owner;
    if (owner instanceof INode) {
      console.log(this.validateLabel(label.text, 'node'));
      owner.tag = {
        id: owner.tag.id,
        label: !this.validateLabel(label.text, 'node') ? label.text : null,
        style: owner.tag.style,
        layout: owner.tag.layout
      };
      this.replaceEdgeTag(owner.tag.id, label.text, owner.tag.label)
    } else if (owner instanceof IEdge) {
      owner.tag = {
        id: owner.tag.id,
        source: owner.tag.source,
        sourceLabel: owner.tag.sourceLabel,
        target: owner.tag.target,
        targetLabel: owner.tag.targetLabel,
        label: label.text,
        style: owner.tag.style,
        layout: owner.tag.layout
      };
    }
    this.save();
    this.createGraph(this.iGraph)
  }

  private replaceEdgeTag(id: string, label: string, oldLabel: string) {
    this.graphComponent.graph.edges.forEach((edge) => {
      if (edge.tag.sourceLabel === id || edge.tag.sourceLabel === oldLabel) {
        edge.tag.sourceLabel = label
      } else if (edge.tag.targetLabel === id || edge.tag.targetLabel === oldLabel) {
        edge.tag.targetLabel = label
      }
    });

  }


  edgeListener(inputMode: GraphEditorInputMode) {
    inputMode.createEdgeInputMode.addEdgeCreatedListener((sender, evt) => {
      const edge = evt.item;
      const sourceNode = edge.sourceNode;
      const targetNode = edge.targetNode;
      edge.tag = {
        id: uuidv4().toString(),
        source: sourceNode?.tag?.id,
        target: targetNode?.tag?.id,
        sourceLabel: sourceNode?.tag?.label ? sourceNode?.tag?.label : sourceNode?.tag?.id,
        targetLabel: targetNode?.tag?.label ? targetNode?.tag?.label : targetNode?.tag?.id,
        style: edge.style,
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

  createGraph(initGraph: any): void {
    const builder = new GraphBuilder()
    const sourceNode = builder.createNodesSource({
      data: initGraph.nodes, id: "id", labels: ['label'], style: "style", layout: "layout"
    });

    const edgeNode = builder.createEdgesSource({
      data: initGraph.edges, id: "id", labels: ['label'], sourceId: "source", targetId: "target", style: "style"
    })
    edgeNode.edgeCreator.defaults.labels.style = new DefaultLabelStyle({
      backgroundFill: 'white',
      textSize: 10
    })
    // aligning the edge label
    const labelModel = new EdgePathLabelModel({distance: 50});

    edgeNode.edgeCreator.defaults.labels.layoutParameter = labelModel.createDefaultParameter();
    this.graphComponent.graph = builder.buildGraph();
    this.initTutorialDefaults(this.graphComponent.graph)
  }

  setFrame(isFilterOpen: boolean) {
    this.isFilterOpen = isFilterOpen;
  }

  clickEvent(tool: { icon: string; toolName: string }) {
    if (this.graphComponent) {
      switch (tool.toolName) {
        case 'save':
          this.save()
          break;
        case 'refresh':
          this.createGraph(this.iGraph);
          break;
        case 'undo':
          ICommand.UNDO.execute(null, this.graphComponent)
          break;
        case 'zoomIn':
          ICommand.INCREASE_ZOOM.execute(null, this.graphComponent)
          break;
        case 'zoomOut':
          ICommand.DECREASE_ZOOM.execute(null, this.graphComponent)
          break;
        case 'fit':
          ICommand.FIT_CONTENT.execute(null, this.graphComponent)
          break;
        case 'redo':
          ICommand.REDO.execute(null, this.graphComponent)
          break;
        case 'cut':
          ICommand.CUT.execute(null, this.graphComponent)
          break;
        case 'copy':
          ICommand.COPY.execute(null, this.graphComponent);
          this.graphComponent.clipboard.fromClipboardCopier.addNodeCopiedListener((sender, evt) => {
            this.graphComponent.graph.setNodeLayout(evt.copy, new Rect(evt.copy.layout.x + 5, evt.copy.layout.y, evt.copy.layout.width, evt.copy.layout.height))
            evt.copy.tag = {id: uuidv4(), label: undefined, style: evt.original.style, layout: evt.copy.layout};
          })
          this.graphComponent.clipboard.fromClipboardCopier.addEdgeCopiedListener((sender, evt) => {
            evt.copy.tag = {id: uuidv4(), label: undefined,source:evt.copy.sourceNode?.tag?.id,target:evt.copy.targetNode?.tag?.id};
          })

          break;
        case 'paste':
          ICommand.PASTE.execute(null, this.graphComponent);
          this.save();
          this.createGraph(this.iGraph);
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
        label: node?.tag?.label, style: node.tag.style, layout: node.tag.layout
      };
      jsonGraph.nodes.push(jsonNode);
    });
    this.graphComponent.graph.edges.forEach((edge) => {
      const jsonEdge = {
        id: edge?.tag?.id,
        source: edge?.tag?.source,
        target: edge?.tag?.target,
        label: edge?.tag?.label,
        sourceLabel: edge?.tag.sourceLabel,
        targetLabel: edge?.tag.targetLabel,
        style: edge.tag.style
        // Include other edge properties as needed
      };
      jsonGraph.edges.push(jsonEdge);
    });
    console.log(jsonGraph)
    this.iGraph = jsonGraph;
  }

  changeEdgeNode(property: any) {
    if (property.source) {
      this.graphComponent.graph.edges.forEach((data) => {
        const source = this.graphComponent.graph.nodes.find((node) =>
          (node.tag.label === property.sourceLabel || node.tag.id === property.sourceLabel))?.tag.id;
        const target = this.graphComponent.graph.nodes.find((node) =>
          (node.tag.label === property.targetLabel || node.tag.id === property.targetLabel))?.tag.id;
        if (data.tag.id === property.id) {
          data.tag = {
            id: data.tag.id,
            source: source,
            target: target,
            label: !this.validateLabel(property.label, 'edge') ? property.label : null,
            sourceLabel: property.sourceLabel, targetLabel: property.targetLabel,
            style: data.tag.style,
            layout: data.tag.layout
          }
        }
      })
    } else {
      this.graphComponent.graph.nodes.forEach((data) => {
        if (data.tag.id === property.id) {
          const oldLabel = data.tag.label
          data.tag = {
            id: data.tag.id,
            label: !this.validateLabel(property.label, 'node') ? property.label : null,
            style: data.tag.style,
            layout: data.tag.layout
          }
          this.replaceEdgeTag(data.tag.id, data.tag.label, oldLabel)

        }
      })
    }
    this.save();
    console.log(this.iGraph)
    this.createGraph(this.iGraph)
  }

  private validateLabel(label: string, type: string) {
    if (type === 'edge') {
      return this.graphComponent.graph.edges.find((edge) => edge.tag.label === label)
    } else {
      return this.graphComponent.graph.nodes.find((node) => node.tag.label === label)
    }
  }
}
