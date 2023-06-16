import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UiToolbarComponent} from "./ui-toolbar.component";
import {ToolbarModule} from "primeng/toolbar";
import {SplitButtonModule} from "primeng/splitbutton";

@NgModule({
  declarations: [UiToolbarComponent],
  imports: [
    CommonModule,
    ToolbarModule,
    SplitButtonModule
  ],
  exports: [UiToolbarComponent]
})
export class UiToolbarModule {
}
