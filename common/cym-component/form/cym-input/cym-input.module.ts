import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CymInputComponent} from "./cym-input.component";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {RequiredComponent} from "../cym-required/required.component";
import {CymTooltipModule} from "../cym-tooltip/cym-tooltip.module";


@NgModule({
  declarations: [CymInputComponent, RequiredComponent],
  imports: [
    CommonModule,
    InputTextModule,
    FormsModule,
    CymTooltipModule
  ],
  exports: [CymInputComponent]
})
export class CymInputModule {
}
