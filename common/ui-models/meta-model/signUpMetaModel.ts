export class SignUpMetaModel {
  public static getMetaModel(){
    return {
      properties: SignUpMetaModel.getProperties()
    }
  }
  public static getProperties() {
    return {
      username:{
        controlName:'',
        header:'',
        type:'text',
        placeholder:null,
        readOnly:false,
        isSearchbar:false,
        showHeader:true,
        showError:true,
      }
    }
  }
}
