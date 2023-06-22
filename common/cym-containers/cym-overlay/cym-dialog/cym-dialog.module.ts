import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CymDialogComponent} from "./cym-dialog.component";
import {DialogModule} from "primeng/dialog";
import {ButtonModule} from "primeng/button";
import {CymDivModule} from "../../cym-div/cym-div.module";

@NgModule({
  declarations: [CymDialogComponent],
    imports: [
        CommonModule,
        DialogModule,
        ButtonModule,
        CymDivModule,
    ],
  exports: [CymDialogComponent]
})
export class CymDialogModule {
}
