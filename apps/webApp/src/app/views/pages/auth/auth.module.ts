import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AuthComponent} from "./auth.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import { SignUpComponent } from './sign-up/sign-up.component';
import {SignUpWidgetComponent} from "../../../widgets/sign-up-widget/sign-up-widget.component";
import {CymInputModule} from "../../../../../../../common/cym-component/form/cym-input/cym-input.module";
import {SignInModule} from "../../../widgets/sign-in/sign-in.module";
import {DividerModule} from "primeng/divider";
import {InputTextModule} from "primeng/inputtext";
import {WidgetFrameModule} from "../../../../../../../common/cym-component/frames/widget-frame/widget-frame.module";
import {CymTooltipModule} from "../../../../../../../common/cym-component/form/cym-tooltip/cym-tooltip.module";
import {NgOtpInputModule} from "ng-otp-input";
import {CymOtpModule} from "../../../../../../../common/cym-component/form/cym-otp/cym-otp.module";
import {CheckboxModule} from "primeng/checkbox";
import {CymCheckboxModule} from "../../../../../../../common/cym-component/form/cym-checkbox/cym-checkbox.module";
import {InputSwitchModule} from "primeng/inputswitch";
import {
  CymInputSwitchModule
} from "../../../../../../../common/cym-component/form/cym-input-switch/cym-input-switch.module";

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
    CymInputModule,
    SignInModule,
    DividerModule,
    InputTextModule,
    WidgetFrameModule,
    CymTooltipModule,
    NgOtpInputModule,
    CymOtpModule,
    CheckboxModule,
    CymCheckboxModule,
    InputSwitchModule,
    CymInputSwitchModule,
  ],
  exports: []
})
export class AuthModule {
}
