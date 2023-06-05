import {StringComponent} from "./stringComponent";
import {CommonMetaModel} from "./commonMetaModel";

export class BaseMetaModel {
  static global = new BaseMetaModel();

  get username() {
    return new StringComponent(
      new CommonMetaModel(
        '',
        'Username',
        true,
        'text',
        true,
        '',
        false,
      ),
      false
    )
  }
}
