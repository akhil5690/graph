import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UiPanelComponent} from "./ui-panel.component";
import {PanelModule} from "primeng/panel";


@NgModule({
  declarations: [UiPanelComponent],
  imports: [
    CommonModule,
    PanelModule
  ],
  exports: [UiPanelComponent]
})
export class UiPanelModule {
}
