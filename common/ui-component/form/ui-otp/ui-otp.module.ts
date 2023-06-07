import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UiOtpComponent} from "./ui-otp.component";
import {NgOtpInputModule} from "ng-otp-input";



@NgModule({
  declarations: [UiOtpComponent],
  imports: [
    CommonModule,
    NgOtpInputModule
  ],
  exports:[UiOtpComponent]
})
export class UiOtpModule { }
