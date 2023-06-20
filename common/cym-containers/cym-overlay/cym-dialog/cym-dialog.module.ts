import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CymDialogComponent} from "./cym-dialog.component";
import {DialogModule} from "primeng/dialog";
import {ButtonModule} from "primeng/button";

@NgModule({
  declarations: [CymDialogComponent],
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
  ],
  exports: [CymDialogComponent]
})
export class CymDialogModule {
}
