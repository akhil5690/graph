import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CymToolbarComponent} from "./cym-toolbar.component";
import {ToolbarModule} from "primeng/toolbar";
import {SplitButtonModule} from "primeng/splitbutton";

@NgModule({
  declarations: [CymToolbarComponent],
  imports: [
    CommonModule,
    ToolbarModule,
    SplitButtonModule
  ],
  exports: [CymToolbarComponent]
})
export class CymToolbarModule {
}
