import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { SignUpModel } from 'common/cym-models/model/signUpModel';
import {SignUpMetaModel} from "../../../../../../common/cym-models/meta-model/widgetMetaModel/signUpMetaModel";

@Component({
  selector: 'cym-sign-up-widget',
  templateUrl: './sign-up-widget.component.html',
  styleUrls: ['./sign-up-widget.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class SignUpWidgetComponent implements OnInit{
  signUpModel = new SignUpModel;
  propertyMeta:any;
  constructor() {
  }

  ngOnInit(): void {
    this.propertyMeta = SignUpMetaModel.getMetaModel().properties;
  }

}
