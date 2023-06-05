import {StringComponent} from "./stringComponent";
import {CommonMetaModel} from "./commonMetaModel";

export class BaseMetaModel {
  static global = new BaseMetaModel();

  get email() {
    return new StringComponent(
      new CommonMetaModel(
        '',
        'Email',
        true,
        'text',
        true,
        '',
        false,
      ),
      false
    )
  }
  get accName() {
    return new StringComponent(
      new CommonMetaModel(
        '',
        'Account Name',
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
