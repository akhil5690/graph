import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CymDividerComponent} from "./cym-divider.component";
import { DividerModule} from "primeng/divider";


@NgModule({
  declarations: [CymDividerComponent],
  imports: [
    CommonModule,
    DividerModule
  ],
  exports: [CymDividerComponent]
})
export class CymDividerModule {
}
