import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CymPanelComponent} from "./cym-panel.component";
import {PanelModule} from "primeng/panel";


@NgModule({
  declarations: [CymPanelComponent],
  imports: [
    CommonModule,
    PanelModule
  ],
  exports: [CymPanelComponent]
})
export class CymPanelModule {
}
