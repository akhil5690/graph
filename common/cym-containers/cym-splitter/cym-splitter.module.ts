import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CymSplitterComponent} from "./cym-splitter.component";
import {SplitterModule} from "primeng/splitter";

@NgModule({
  declarations: [CymSplitterComponent],
  imports: [
    CommonModule,
    SplitterModule
  ],
  exports: [CymSplitterComponent]
})
export class CymSplitterModule {
}
