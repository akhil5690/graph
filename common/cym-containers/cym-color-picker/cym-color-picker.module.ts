import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ColorPickerModule} from "primeng/colorpicker";
import {CymColorPickerComponent} from "./cym-color-picker.component";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [CymColorPickerComponent],
  imports: [
    CommonModule,
    ColorPickerModule,
    FormsModule
  ],
  exports: [CymColorPickerComponent]
})
export class CymColorPickerModule{
}
