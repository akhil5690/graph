import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CymToastComponent} from "./cym-toast.component";
import {ToastModule} from "primeng/toast";
import {ButtonModule} from "primeng/button";


@NgModule({
  declarations: [CymToastComponent],
  imports: [
    CommonModule,
    ToastModule,
    ButtonModule,
  ],
  exports: [CymToastComponent]
})
export class CymToastModule {
}
