import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CymTabViewComponent} from "./cym-tab-view.component";
import {TabViewModule} from "primeng/tabview";

@NgModule({
  declarations: [CymTabViewComponent],
  imports: [
    CommonModule,
    TabViewModule
  ],
  exports: [CymTabViewComponent]
})
export class CymTabViewModule {
}
