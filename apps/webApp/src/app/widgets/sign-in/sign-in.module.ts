import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignInComponent} from './sign-in.component';
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {DividerModule} from "primeng/divider";
import {InputSwitchModule} from "primeng/inputswitch";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToggleButtonModule} from "primeng/togglebutton";
import {WidgetFrameModule} from "../../../../../../common/cym-component/frames/widget-frame/widget-frame.module";
import {InputTextareaModule} from "primeng/inputtextarea";
import {CymButtonComponent} from "../../../../../../common/cym-component/form/cym-button/cym-button.component";
import {CymDivModule} from "../../../../../../common/cym-containers/cym-div/cym-div.module";


@NgModule({
  declarations: [
    SignInComponent,
    CymButtonComponent
  ],
  exports: [
    SignInComponent,
    CymButtonComponent,
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
    InputTextareaModule,
    ReactiveFormsModule,
    CymDivModule,
  ]
})
export class SignInModule {
}
