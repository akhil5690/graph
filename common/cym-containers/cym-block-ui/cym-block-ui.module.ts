import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CymBlockUiComponent} from "./cym-block-ui.component";
import {BlockUIModule} from "primeng/blockui";
import {PanelModule} from "primeng/panel";
import {ButtonModule} from "primeng/button";


@NgModule({
  declarations: [CymBlockUiComponent],
  imports: [
    CommonModule,
    BlockUIModule,
    PanelModule,
    ButtonModule,
  ],
  exports: [CymBlockUiComponent]
})
export class CymBlockUiModule {
}
