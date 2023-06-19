import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CymOtpComponent} from "./cym-otp.component";
import {NgOtpInputModule} from "ng-otp-input";



@NgModule({
  declarations: [CymOtpComponent],
  imports: [
    CommonModule,
    NgOtpInputModule
  ],
  exports:[CymOtpComponent]
})
export class CymOtpModule { }
