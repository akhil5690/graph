import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CymConfirmPopupComponent} from "./cym-confirm-popup.component";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {ButtonModule} from "primeng/button";
import {ToastModule} from "primeng/toast";

@NgModule({
  declarations: [CymConfirmPopupComponent],
    imports: [
        CommonModule,
        ConfirmPopupModule,
        ButtonModule,
        ToastModule,
    ],
  exports: [CymConfirmPopupComponent]
})
export class CymConfirmPopupModule {
}
