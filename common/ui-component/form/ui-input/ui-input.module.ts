import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UiInputComponent} from "./ui-input.component";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [UiInputComponent],
  imports: [
    CommonModule,
    InputTextModule,
    FormsModule
  ],
  exports: [UiInputComponent]
})
export class UiInputModule {
}
