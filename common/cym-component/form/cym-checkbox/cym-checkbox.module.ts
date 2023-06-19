import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CymCheckboxComponent} from "./cym-checkbox.component";
import {CheckboxModule} from "primeng/checkbox";



@NgModule({
  declarations: [CymCheckboxComponent],
  imports: [
    CommonModule,
    CheckboxModule
  ],
  exports:[CymCheckboxComponent]
})
export class CymCheckboxModule { }
