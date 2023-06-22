import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonModule} from "primeng/button";
import {CymOverlayPanelComponent} from "./cym-overlay-panel.component";
import {OverlayPanelModule} from "primeng/overlaypanel";

@NgModule({
  declarations: [CymOverlayPanelComponent],
  imports: [
    CommonModule,
    OverlayPanelModule,
    ButtonModule,
  ],
  exports: [CymOverlayPanelComponent]
})
export class CymOverlayPanelModule {
}
