import {CommonMetaModel} from "./commonMetaModel";

export class StringComponent extends CommonMetaModel{
  // meta model for string/input field component
  constructor(
    public commonPropertyMeta: CommonMetaModel,
    public searchIcon = false,
    public textArea: boolean = false,
    public textAreaColumns: number = 50,
    public textAreaRows: number = 1,
    public typeEmail = null,
    public dataType = 'text',
    public baseClass = '',
    public nameValidator = null,
    public headerColor: boolean = false,
    public customStyle = false,
    public textEllipsis = false,
    public onlyChar = false,
    public allowType = /^[^]+$/,
    public showIconForPassword = false,
    public makePasswordVisible = false,
    public passwordStrength = false,
    public showToolTip = false,
    public minWidth = '0px',
    public hideAstrix = false,
    public hasScanner = false,
    public barCodeOptions = null,
    public makeLowerCase = false,
    public appendISD = null
  ) {
    super()
  }
}
