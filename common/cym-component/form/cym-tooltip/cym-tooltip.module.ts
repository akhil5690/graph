import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CymTooltipComponent} from "./cym-tooltip.component";
import {TooltipModule} from "primeng/tooltip";


@NgModule({
  declarations: [CymTooltipComponent],
  imports: [
    CommonModule,
    TooltipModule
  ],
  exports: [CymTooltipComponent]
})
export class CymTooltipModule {
}
