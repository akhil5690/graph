import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AuthComponent} from "./auth.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import { SignUpComponent } from './sign-up/sign-up.component';
import {SignUpWidgetComponent} from "../../../widgets/sign-up-widget/sign-up-widget.component";
import {UiInputModule} from "../../../../../../../common/ui-component/form/ui-input/ui-input.module";
import {SignInModule} from "../../../widgets/sign-in/sign-in.module";
import {DividerModule} from "primeng/divider";
import {InputTextModule} from "primeng/inputtext";
import {WidgetFrameModule} from "../../../../../../../common/ui-component/frames/widget-frame/widget-frame.module";
import {UiTooltipModule} from "../../../../../../../common/ui-component/form/ui-tooltip/ui-tooltip.module";
import {NgOtpInputModule} from "ng-otp-input";
import {UiOtpModule} from "../../../../../../../common/ui-component/form/ui-otp/ui-otp.module";
import {CheckboxModule} from "primeng/checkbox";
import {UiCheckboxModule} from "../../../../../../../common/ui-component/form/ui-checkbox/ui-checkbox.module";
import {InputSwitchModule} from "primeng/inputswitch";
import {
  UiInputSwitchModule
} from "../../../../../../../common/ui-component/form/ui-input-switch/ui-input-switch.module";

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: SignInComponent,
      },
      {
        path: 'signUp',
        component: SignUpComponent,
      },

    ]
  }
]

@NgModule({
  declarations: [

    SignUpComponent,
    SignUpWidgetComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UiInputModule,
    SignInModule,
    DividerModule,
    InputTextModule,
    WidgetFrameModule,
    UiTooltipModule,
    NgOtpInputModule,
    UiOtpModule,
    CheckboxModule,
    UiCheckboxModule,
    InputSwitchModule,
    UiInputSwitchModule,
  ],
  exports: []
})
export class AuthModule {
}
