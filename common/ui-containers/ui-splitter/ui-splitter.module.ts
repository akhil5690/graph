import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UiSplitterComponent} from "./ui-splitter.component";
import {SplitterModule} from "primeng/splitter";

@NgModule({
  declarations: [UiSplitterComponent],
  imports: [
    CommonModule,
    SplitterModule
  ],
  exports: [UiSplitterComponent]
})
export class UiSplitterModule{
}
