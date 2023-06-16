import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UiTabViewComponent} from "./ui-tab-view.component";
import {TabViewModule} from "primeng/tabview";

@NgModule({
  declarations: [UiTabViewComponent],
  imports: [
    CommonModule,
    TabViewModule
  ],
  exports: [UiTabViewComponent]
})
export class UiTabViewModule {
}
