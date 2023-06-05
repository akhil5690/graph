import {BaseMetaModel} from "../componentMetaModel/baseMetaModel";

export class SignUpMetaModel {
  public static getMetaModel(){
    return {
      properties: SignUpMetaModel.getProperties()
    }
  }
  public static getProperties() {
    return {
      username:BaseMetaModel.global.username
    }
  }
}
