import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CymPasswordComponent} from "./cym-password.component";
import {PasswordModule} from "primeng/password";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [CymPasswordComponent],
  imports: [
    CommonModule,
    PasswordModule,
    FormsModule
  ],
  exports: [CymPasswordComponent]
})
export class CymPasswordModule {
}
