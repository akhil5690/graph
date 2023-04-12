import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in.component';
import {WidgetFrameModule} from "../../../../common/component/ui-component/widget-frame/widget-frame.module";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {DividerModule} from "primeng/divider";
import {InputSwitchModule} from "primeng/inputswitch";
import {FormsModule} from "@angular/forms";
import {ToggleButtonModule} from "primeng/togglebutton";



@NgModule({
  declarations: [
    SignInComponent
  ],
  exports: [
    SignInComponent,
  ],
  imports: [
    CommonModule,
    WidgetFrameModule,
    InputTextModule,
    ButtonModule,
    DividerModule,
    InputSwitchModule,
    FormsModule,
    ToggleButtonModule
  ]
})
export class SignInModule { }
