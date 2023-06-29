import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputTextareaModule} from "primeng/inputtextarea";
import {CymInputTextareaComponent} from "./cym-input-textarea.component";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [CymInputTextareaComponent],
  imports: [
    CommonModule,
    InputTextareaModule,
    FormsModule,
  ],
  exports: [CymInputTextareaComponent]
})
export class CymInputTextareaModule {
}
