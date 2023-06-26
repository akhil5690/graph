import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CymPasswordComponent} from "./cym-password.component";
import {PasswordModule} from "primeng/password";
import {FormsModule} from "@angular/forms";
import {CymInputModule} from "../../cym-component/form/cym-input/cym-input.module";
import {CymTooltipModule} from "../cym-overlay/cym-tooltip/cym-tooltip.module";

@NgModule({
  declarations: [CymPasswordComponent],
  imports: [
    CommonModule,
    PasswordModule,
    FormsModule,
    CymInputModule,
    CymTooltipModule
  ],
  exports: [CymPasswordComponent]
})
export class CymPasswordModule {
}
