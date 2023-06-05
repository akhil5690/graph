import {CommonMetaModel} from "./commonMetaModel";

export class StringComponent extends CommonMetaModel{
  // meta model for string/input field component
  textArea: boolean;
  textAreaColumns: number;
  textAreaRows: number;
  typeEmail: null; // todo once all meta is done change to boolean;
  dataType: string;
  baseClass: string;
  nameValidator: string;
  headerColor: boolean;
  customStyle: boolean;
  textEllipsis: boolean;
  searchIcon: boolean;
  onlyChar: boolean;
  allowType: RegExp;
  showIconForPassword: boolean;
  makePasswordVisible: boolean;
  passwordStrength: boolean;
  showToolTip: boolean;
  // updateOn: string;
  minWidth?: string;
  hideAstrix?: boolean;
  hasScanner?: boolean;
  // barCodeOption: BarcodeScannerOptions;
  makeLowerCase: boolean;
  appendISD: string;

  // maximumLen: number;   // max length after allowing type
  constructor(
    zuiCommonPropertyMeta: CommonMetaModel,
    textArea: boolean = false,
    textAreaColumns: number = 50,
    textAreaRows: number = 1,
    typeEmail = null,
    dataType = 'text',
    baseClass = '',
    nameValidator = '',
    headerColor: boolean = false,
    customStyle = false,
    textEllipsis = false,
    searchIcon = false,
    onlyChar = false,
    allowType = /^[^]+$/,
    showIconForPassword = false,
    makePasswordVisible = false,
    passwordStrength = false,
    showToolTip = false,
    minWidth = '0px',
    hideAstrix = false,
    hasScanner = false,
    barCodeOptions = null,
    makeLowerCase = false,
    appendISD = ''
  ) {
    super(
      zuiCommonPropertyMeta.field,
      zuiCommonPropertyMeta.header,
      zuiCommonPropertyMeta.showHeader,
      zuiCommonPropertyMeta.type,
      zuiCommonPropertyMeta.required,
      zuiCommonPropertyMeta.placeholder,
      zuiCommonPropertyMeta.readOnly,
      zuiCommonPropertyMeta.showBorders,
      zuiCommonPropertyMeta.minLength,
      zuiCommonPropertyMeta.maxLength,
      zuiCommonPropertyMeta.showError,
      zuiCommonPropertyMeta.labelPosition,
      zuiCommonPropertyMeta.isHyperlink,
      // zuiCommonPropertyMeta.routerPath,
      zuiCommonPropertyMeta.configRequired,
      zuiCommonPropertyMeta.formatType,
      zuiCommonPropertyMeta.hideColumn,
      zuiCommonPropertyMeta.showDifference,
      zuiCommonPropertyMeta.showTwoRowWrapper,
      zuiCommonPropertyMeta.autoComplete,
      zuiCommonPropertyMeta.enableQuickAdd,
      zuiCommonPropertyMeta.showInQuickAdd,
      zuiCommonPropertyMeta.isDynamicHyperlink,
      zuiCommonPropertyMeta.isLoading,
      zuiCommonPropertyMeta.updateOn, zuiCommonPropertyMeta.addSplSymbol,
      zuiCommonPropertyMeta.showAstrixNoValidation, zuiCommonPropertyMeta.addSuffix,
      zuiCommonPropertyMeta.mobileReadOnlyLabel, zuiCommonPropertyMeta.overrideMinMaxDate,
      // zuiCommonPropertyMeta.nextelementId,
      // zuiCommonPropertyMeta.currentElementId
    );
    this.textArea = textArea;
    this.textAreaColumns = textAreaColumns;
    this.textAreaRows = textAreaRows;
    this.typeEmail = typeEmail;
    this.dataType = dataType;
    this.baseClass = baseClass;
    this.nameValidator = nameValidator;
    this.headerColor = headerColor;
    this.customStyle = customStyle;
    this.textEllipsis = textEllipsis;
    this.searchIcon = searchIcon;
    this.onlyChar = onlyChar;
    this.allowType = allowType;
    this.showIconForPassword = showIconForPassword;
    this.makePasswordVisible = makePasswordVisible;
    this.passwordStrength = passwordStrength;
    this.showToolTip = showToolTip;
    this.minWidth = minWidth;
    this.hideAstrix = hideAstrix;
    this.hasScanner = hasScanner;
    // this.barCodeOption = barCodeOptions;
    this.makeLowerCase = makeLowerCase;
    this.appendISD = appendISD;
    // this.maximumLen = (maximumLen === null) ? -1 : maximumLen ;
  }
}
