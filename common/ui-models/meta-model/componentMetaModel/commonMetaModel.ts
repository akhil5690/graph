export class CommonMetaModel {
  // Common property meta model
  constructor(
    public field: string = '',
    public header: string = '',
    public showHeader: boolean = true,
    public type: string = '',
    public required: boolean = false,
    public placeholder: string = 'place holder',
    public readOnly: boolean = false,
    public showBorders: boolean = true,
    public minLength: number = 0,
    public maxLength: number = 50,
    public showError = false,
    public labelPosition: string = 'top',
    public isHyperlink = false,
    public configRequired: boolean = false,
    public formatType: string = '',
    public hideColumn = false,
    public showDifference = false,
    public showTwoRowWrapper = false,
    public autoComplete = false,
    public enableQuickAdd = true,
    public showInQuickAdd = false,
    public isDynamicHyperlink = false,
    public isLoading = false,
    public updateOn = 'change',
    public addSplSymbol: string = '',
    public showAstrixNoValidation = false,
    public addSuffix = null,
    public mobileReadOnlyLabel = null,
    public overrideMinMaxDate = false,
    public nextelementId = null,
    public currentElementId = null,
    public toolTip = null

  ) {
  }
}
