import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UiTooltipComponent} from "./ui-tooltip.component";
import {TooltipModule} from "primeng/tooltip";


@NgModule({
  declarations: [UiTooltipComponent],
  imports: [
    CommonModule,
    TooltipModule
  ],
  exports: [UiTooltipComponent]
})
export class UiTooltipModule {
}
