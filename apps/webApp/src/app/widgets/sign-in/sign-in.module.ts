import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in.component';
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {DividerModule} from "primeng/divider";
import {InputSwitchModule} from "primeng/inputswitch";
import {FormsModule} from "@angular/forms";
import {ToggleButtonModule} from "primeng/togglebutton";
import {WidgetFrameModule} from "../../../../../../common/ui-component/frames/widget-frame/widget-frame.module";


@NgModule({
  declarations: [
    SignInComponent
  ],
  exports: [
    SignInComponent,
  ],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    DividerModule,
    InputSwitchModule,
    FormsModule,
    ToggleButtonModule,
    WidgetFrameModule,
  ]
})
export class SignInModule { }