import {BaseMetaModel} from "../componentMetaModel/baseMetaModel";

export class SignInMetaModel {
  public static getMetaModel(){
    return {
      properties: SignInMetaModel.getProperties()
    }
  }
  public static getProperties() {
    return {
      email:BaseMetaModel.global.email,
      password:BaseMetaModel.global.accName
    }
  }
}
