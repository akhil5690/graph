import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UiInputComponent} from "./ui-input.component";
import {InputTextModule} from "primeng/inputtext";


@NgModule({
  declarations: [UiInputComponent],
  imports: [
    CommonModule,
    InputTextModule
  ],
  exports: [UiInputComponent]
})
export class UiInputModule {
}
