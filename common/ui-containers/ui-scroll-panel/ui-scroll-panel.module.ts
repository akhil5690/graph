import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UiScrollPanelComponent} from "./ui-scroll-panel.component";
import {ScrollPanelModule} from "primeng/scrollpanel";


@NgModule({
  declarations: [UiScrollPanelComponent],
  imports: [
    CommonModule,
    ScrollPanelModule
  ],
  exports: [UiScrollPanelComponent]
})
export class UiScrollPanelModule{
}
