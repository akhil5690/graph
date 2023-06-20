import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CymConfirmDialogComponent} from "./cym-confirm-dialog.component";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";

@NgModule({
  declarations: [CymConfirmDialogComponent],
    imports: [
        CommonModule,
        ConfirmDialogModule,
        ToastModule,
    ],
  exports: [CymConfirmDialogComponent]
})
export class CymConfirmDialogModule {
}
