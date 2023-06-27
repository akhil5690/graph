import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CymProfileComponent} from "./cym-profile.component";
import {CymOverlayPanelModule} from "../cym-overlay/cym-overlay-panel/cym-overlay-panel.module";
import {ButtonModule} from "primeng/button";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {CymMenuModule} from "../cym-menu/cym-menu.module";


@NgModule({
  declarations: [CymProfileComponent],
  imports: [
    CommonModule,
    CymOverlayPanelModule,
    ButtonModule,
    OverlayPanelModule,
    CymMenuModule,
  ],
  exports: [CymProfileComponent]
})
export class CymProfileModule {
}
