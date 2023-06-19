import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CymScrollPanelComponent} from "./cym-scroll-panel.component";
import {ScrollPanelModule} from "primeng/scrollpanel";


@NgModule({
  declarations: [CymScrollPanelComponent],
  imports: [
    CommonModule,
    ScrollPanelModule
  ],
  exports: [CymScrollPanelComponent]
})
export class CymScrollPanelModule {
}
