import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UiInputComponent} from "./ui-input.component";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {RequiredComponent} from "../ui-required/required.component";
import {UiTooltipModule} from "../ui-tooltip/ui-tooltip.module";


@NgModule({
  declarations: [UiInputComponent, RequiredComponent],
  imports: [
    CommonModule,
    InputTextModule,
    FormsModule,
    UiTooltipModule
  ],
  exports: [UiInputComponent]
})
export class UiInputModule {
}
