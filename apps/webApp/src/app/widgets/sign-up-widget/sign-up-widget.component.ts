import {Component, OnInit} from '@angular/core';
import {SignUpMetaModel} from "../../../../../../common/ui-models/meta-model/widgetMetaModel/signUpMetaModel";

@Component({
  selector: 'app-sign-up-widget',
  templateUrl: './sign-up-widget.component.html',
  styleUrls: ['./sign-up-widget.component.scss']
})
export class SignUpWidgetComponent implements OnInit{
  propertyMeta:any;
  constructor() {
  }

  ngOnInit(): void {
    this.propertyMeta = SignUpMetaModel.getMetaModel().properties;
  }
}
