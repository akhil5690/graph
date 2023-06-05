export class CommonMetaModel {
  // Common property meta model
  field: string;
  header: string;
  showHeader: boolean;
  type: string;
  required: boolean;
  placeholder: string;
  readOnly: boolean;
  showBorders: boolean;
  minLength: number;
  maxLength: number;
  showError: boolean;
  isHyperlink: boolean;
  // routerPath: PageRouting;
  labelPosition: string;
  configRequired: boolean;
  formatType: string;
  hideColumn: boolean;
  showDifference: boolean;
  showTwoRowWrapper: boolean;
  autoComplete: boolean;
  enableQuickAdd: boolean;
  showInQuickAdd: boolean;
  isDynamicHyperlink: boolean;
  isLoading: boolean;
  updateOn?: string;
  addSplSymbol?: string;
  showAstrixNoValidation: boolean;
  addSuffix: string;
  mobileReadOnlyLabel: string;
  overrideMinMaxDate: boolean;
  // nextelementId: number;
  // currentElementId: number;
  toolTip?: string;

  constructor(
    field: string = '',
    header: string = '',
    showHeader: boolean = true,
    type: string = '',
    required: boolean = false,
    placeholder: string = 'place holder',
    readOnly: boolean = false,
    showBorders: boolean = true,
    minLength: number = 0,
    maxLength: number = 50,
    showError = false,
    labelPosition: string = 'top',
    isHyperlink = false,
    // routerPath: PageRouting = PageRouting.LAUNCH_PAD,
    configRequired: boolean = false,
    formatType: string = '',
    hideColumn = false,
    showDifference = false,
    showTwoRowWrapper = false,
    autoComplete = false,
    enableQuickAdd = true,
    showInQuickAdd = false,
    isDynamicHyperlink = false,
    isLoading = false,
    updateOn = 'change',
    addSplSymbol = '',
    showAstrixNoValidation = false,
    addSuffix:string = '',
    mobileReadOnlyLabel = '',
    overrideMinMaxDate = false,
    // nextelementId = null,
    // currentElementId = null,
    toolTip = ''
  ) {
    this.field = field;
    this.header = header;
    this.showHeader = showHeader;
    this.type = type;
    this.required = required;
    this.placeholder = placeholder;
    this.readOnly = readOnly;
    this.showBorders = showBorders;
    this.minLength = minLength;
    this.maxLength = maxLength;
    this.showError = showError;

    this.labelPosition = labelPosition;
    this.isHyperlink = isHyperlink;
    // this.routerPath = routerPath;
    this.configRequired = configRequired;
    this.formatType = formatType;
    this.hideColumn = hideColumn;
    this.showDifference = showDifference;
    this.showTwoRowWrapper = showTwoRowWrapper;
    this.autoComplete = autoComplete;
    this.enableQuickAdd = enableQuickAdd;
    this.showInQuickAdd = showInQuickAdd;
    this.isDynamicHyperlink = isDynamicHyperlink;
    this.isLoading = isLoading;
    this.updateOn = updateOn;
    this.addSplSymbol = addSplSymbol;
    this.showAstrixNoValidation = showAstrixNoValidation;
    this.addSuffix = addSuffix;
    this.mobileReadOnlyLabel = mobileReadOnlyLabel;
    this.overrideMinMaxDate = overrideMinMaxDate;
    // this.nextelementId = nextelementId;
    // this.currentElementId = currentElementId;
    this.toolTip = toolTip;
  }
}
