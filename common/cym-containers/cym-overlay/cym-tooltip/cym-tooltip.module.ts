import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CymTooltipComponent} from "./cym-tooltip.component";
import {TooltipModule} from "primeng/tooltip";
import {InputTextModule} from "primeng/inputtext";


@NgModule({
  declarations: [CymTooltipComponent],
    imports: [
        CommonModule,
        TooltipModule,
        InputTextModule
    ],
  exports: [CymTooltipComponent]
})
export class CymTooltipModule {
}
