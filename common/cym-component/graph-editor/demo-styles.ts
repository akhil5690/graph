/****************************************************************************
 ** @license
 ** This demo file is part of yFiles for HTML 2.5.0.4.
 ** Copyright (c) 2000-2023 by yWorks GmbH, Vor dem Kreuzberg 28,
 ** 72070 Tuebingen, Germany. All rights reserved.
 **
 ** yFiles demo files exhibit yFiles for HTML functionalities. Any redistribution
 ** of demo files in source code or binary form, with or without
 ** modification, is not permitted.
 **
 ** Owners of a valid software license for a yFiles for HTML version that this
 ** demo is shipped with are allowed to use the demo source code as basis
 ** for their own yFiles for HTML powered applications. Use of such programs is
 ** governed by the rights and conditions as set out in the yFiles for HTML
 ** license agreement.
 **
 ** THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESS OR IMPLIED
 ** WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 ** MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN
 ** NO EVENT SHALL yWorks BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 ** SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 ** TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 ** PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 ** LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 ** NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 ** SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 **
 ***************************************************************************/
/* eslint-disable jsdoc/check-param-names */
import {
  DefaultEdgePathCropper,
  DefaultLabelStyle,
  EdgeSelectionIndicatorInstaller,
  Fill, GeneralPath,
  GraphComponent,
  GroupNodeLabelModel,
  GroupNodeStyle,
  HorizontalTextAlignment,
  IGraph,
  ILabelStyle, ImageNodeStyle,
  Insets,
  LabelShape,
  OrientedRectangleIndicatorInstaller,
  PolylineEdgeStyle, Rect,
  RectangleIndicatorInstaller,
  ShapeNodeShape,
  ShapeNodeStyle,
  Theme,
  VerticalTextAlignment
} from 'yfiles'
import type {ColorSet as CS, ColorSetName as CSN} from './demo-colors'
import {colorSets as cs} from './demo-colors'

export type ColorSetName = CSN
export type ColorSet = CS
export const colorSets = cs

export type CssClassNames = {
  node?: ColorSetName
  nodeLabel?: ColorSetName
  edge?: ColorSetName
  edgeLabel?: ColorSetName
  group?: ColorSetName
  groupLabel?: ColorSetName
}

export function isColorSetName(arg: string): arg is ColorSetName {
  return arg in colorSets
}

/**
 * Initializes graph defaults with nicely configured built-in yFiles styles.
 *
 * @param graph The graph on which the default styles and style-related setting are set.
 * @param theme Optional color set names for all the demo styles. The default is 'demo-orange'.
 * @param foldingEnabled whether to use collapsable group node style
 * @param extraCropLength the extra crop length for the DefaultEdgePathCropper.
 * @param shape the optional shape of the node style, if undefined a RectangularNodeStyle is used.
 */
export function initDemoStyles(
  graph: IGraph,
  {
    theme = {},
    foldingEnabled = false,
    extraCropLength = 2.0,
    shape = undefined
  }: {
    theme?: CssClassNames | ColorSetName
    foldingEnabled?: boolean
    extraCropLength?: number
    shape?: ShapeNodeShape
  } = {}
): void {
  if (typeof theme === 'string') {
    theme = {node: theme, edge: theme, group: theme}
  }

  theme.node = theme.node || 'demo-orange'
  // theme.nodeLabel = theme.nodeLabel || theme.node
  theme.edge = theme.edge || theme.node || 'demo-orange'
  // theme.edgeLabel = theme.edgeLabel || theme.edge
  theme.group = theme.group || 'demo-palette-12'
  theme.groupLabel = theme.groupLabel || theme.group

  graph.nodeDefaults.style = shape
    ? createShapeNodeStyle(shape, theme.node)
    : createDemoNodeStyle(theme.node)
  // graph.nodeDefaults.labels.style = createDemoNodeLabelStyle(theme.nodeLabel)

  graph.groupNodeDefaults.style = createDemoGroupStyle({
    colorSetName: theme.group,
    foldingEnabled
  })
  graph.groupNodeDefaults.labels.style = createDemoGroupLabelStyle(theme.groupLabel)
  graph.groupNodeDefaults.labels.layoutParameter =
    new GroupNodeLabelModel().createTabBackgroundParameter()

  graph.edgeDefaults.style = createDemoEdgeStyle({colorSetName: theme.edge})
  graph.decorator.portDecorator.edgePathCropperDecorator.setImplementation(
    new DefaultEdgePathCropper({cropAtPort: false, extraCropLength})
  )
  graph.edgeDefaults.labels.style = createDemoEdgeLabelStyle(theme.edgeLabel)
}

/**
 * Creates a new rectangular node style whose colors match the given well-known CSS style.
 */
export function createDemoNodeStyle(
  colorSetName: ColorSetName = 'demo-orange'
): ShapeNodeStyle {
  return new ShapeNodeStyle({
    shape: ShapeNodeShape.ROUND_RECTANGLE,
    fill: colorSets[colorSetName].fill,
    stroke: `1.5px ${colorSets[colorSetName].stroke}`
  })
}

/**
 * Creates a new node style with the given shape whose colors match the given well-known CSS style.
 */
export function createShapeNodeStyle(
  shape: ShapeNodeShape,
  colorSetName: ColorSetName = 'demo-orange'
): ShapeNodeStyle {
  return new ShapeNodeStyle({
    shape,
    fill: colorSets[colorSetName].fill,
    stroke: `1.5px ${colorSets[colorSetName].stroke}`
  })
}

export function createPolylineEdgeStyle(sourceArrow: any, targetArrow: any, smoothingLength: any
): PolylineEdgeStyle {
  return new PolylineEdgeStyle({
    sourceArrow: sourceArrow,
    targetArrow: targetArrow,
    smoothingLength: smoothingLength
  })
}

export function createIconNode(
  imageUrl: string
): ImageNodeStyle {
  const outlinePath = new GeneralPath()
  outlinePath.appendEllipse(new Rect(0, 0, 0.9, 0.9), true)
  return new ImageNodeStyle({
    image: imageUrl,
    normalizedOutline: outlinePath
  })
}

/**
 * Creates a new polyline edge style whose colors match the given well-known CSS style.
 */
export function createDemoEdgeStyle({
                                      colorSetName = 'demo-orange',
                                      showTargetArrow = true
                                    }: {
  colorSetName?: ColorSetName
  showTargetArrow?: boolean
} = {}): PolylineEdgeStyle {
  const edgeColor = colorSets[colorSetName].stroke
  return new PolylineEdgeStyle({
    stroke: `1.5px ${edgeColor}`,
    targetArrow: showTargetArrow ? `${edgeColor} small triangle` : 'none'
  })
}

/**
 * Creates a new node label style whose colors match the given well-known CSS style.
 */
export function createDemoNodeLabelStyle(
  colorSetName: ColorSetName = 'demo-orange'
): DefaultLabelStyle {
  const labelStyle = new DefaultLabelStyle()
  labelStyle.shape = LabelShape.ROUND_RECTANGLE
  labelStyle.backgroundFill = Fill.from(colorSets[colorSetName].nodeLabelFill)
  labelStyle.textFill = Fill.from(colorSets[colorSetName].text)
  labelStyle.verticalTextAlignment = VerticalTextAlignment.CENTER
  labelStyle.horizontalTextAlignment = HorizontalTextAlignment.CENTER
  labelStyle.insets = new Insets(4, 2, 4, 1)
  return labelStyle
}

/**
 * Creates a new edge label style whose colors match the given well-known CSS style.
 */
export function createDemoEdgeLabelStyle(
  colorSetName: ColorSetName = 'demo-orange'
): DefaultLabelStyle {
  const labelStyle = new DefaultLabelStyle()
  // labelStyle.shape = LabelShape.ROUND_RECTANGLE
  labelStyle.backgroundFill = "#EBEDEF"
  // labelStyle.textFill = Fill.from(colorSets[colorSetName].text)
  // labelStyle.verticalTextAlignment = VerticalTextAlignment.CENTER
  // labelStyle.horizontalTextAlignment = HorizontalTextAlignment.CENTER
  // labelStyle.insets = new Insets(4, 2, 4, 1)
  return labelStyle
}

/**
 * Creates a new group label style whose colors match the given well-known CSS style.
 */
export function createDemoGroupLabelStyle(
  colorSetName: ColorSetName = 'demo-palette-12'
): ILabelStyle {
  return new DefaultLabelStyle({
    verticalTextAlignment: 'center',
    horizontalTextAlignment: 'left',
    clipText: false,
    wrapping: 'character-ellipsis',
    textFill: colorSets[colorSetName].nodeLabelFill
  })
}

/**
 * Creates a new group node style whose colors match the given well-known CSS style.
 */
export function createDemoGroupStyle({
                                       colorSetName = 'demo-palette-12',
                                       foldingEnabled = false
                                     }: {
  colorSetName?: ColorSetName
  foldingEnabled?: boolean
}): GroupNodeStyle {
  return new GroupNodeStyle({
    groupIcon: foldingEnabled ? 'minus' : 'none',
    folderIcon: 'plus',
    tabFill: foldingEnabled ? colorSets[colorSetName].nodeLabelFill : colorSets[colorSetName].fill,
    stroke: `2px solid ${colorSets[colorSetName].fill}`,
    tabBackgroundFill: foldingEnabled ? colorSets[colorSetName].fill : null,
    tabPosition: foldingEnabled ? 'top-trailing' : 'top-leading',
    tabWidth: 30,
    tabHeight: 20,
    tabInset: 3,
    iconOffset: 2,
    iconSize: 14,
    iconForegroundFill: colorSets[colorSetName].fill,
    hitTransparentContentArea: true
  })
}

/**
 * Applies the default demo theme to the {@link GraphComponent}.
 */
export function applyDemoTheme(graphComponent: GraphComponent): void {
  const theme = new Theme({
    variant: 'simple-round',
    scale: 1.4,
    primaryColor: '#38434f',
    backgroundColor: '#ffffff'
  })
  graphComponent.theme = theme
  // use hatch selection for better compatibility with arbitrary item colors
  graphComponent.resources.set(
    RectangleIndicatorInstaller.SELECTION_TEMPLATE_KEY,
    theme.hatchRectangle
  )
  graphComponent.resources.set(
    OrientedRectangleIndicatorInstaller.SELECTION_TEMPLATE_KEY,
    theme.hatchRectangle
  )
  graphComponent.resources.set(EdgeSelectionIndicatorInstaller.STROKE_KEY, theme.hatchStroke)
}

export function addClass(e: Element, className: string): Element {
  const classes = e.getAttribute('class')
  if (classes === null || classes === '') {
    e.setAttribute('class', className)
  } else if (!hasClass(e, className)) {
    e.setAttribute('class', `${classes} ${className}`)
  }
  return e
}

export function hasClass(e: Element, className: string): boolean {
  const classes = e.getAttribute('class') || ''
  const r = new RegExp(`\\b${className}\\b`, '')
  return r.test(classes)
}

export function removeClass(e: Element, className: string): Element {
  const classes = e.getAttribute('class')
  if (classes !== null && classes !== '') {
    if (classes === className) {
      e.setAttribute('class', '')
    } else {
      const result = classes
        .split(' ')
        .filter((s: any) => s !== className)
        .join(' ')
      e.setAttribute('class', result)
    }
  }
  return e
}
