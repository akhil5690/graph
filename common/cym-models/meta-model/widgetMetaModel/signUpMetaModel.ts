import {BaseMetaModel} from "../componentMetaModel/baseMetaModel";

export class SignUpMetaModel {
  public static getMetaModel() {
    return {
      properties: SignUpMetaModel.getProperties()
    }
  }

  public static getProperties() {
    const email = BaseMetaModel.global.email;
    const accName = BaseMetaModel.global.accName;
    email.toolTip = 'Email'
    accName.toolTip = 'Account Name'
    return {
      email: email,
      accName: accName
    }
  }
}
