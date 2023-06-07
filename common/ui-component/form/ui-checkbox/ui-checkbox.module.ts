import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UiCheckboxComponent} from "./ui-checkbox.component";
import {CheckboxModule} from "primeng/checkbox";



@NgModule({
  declarations: [UiCheckboxComponent],
  imports: [
    CommonModule,
    CheckboxModule
  ],
  exports:[UiCheckboxComponent]
})
export class UiCheckboxModule { }
