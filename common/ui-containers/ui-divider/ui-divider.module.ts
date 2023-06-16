import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UiDividerComponent} from "./ui-divider.component";
import { DividerModule} from "primeng/divider";


@NgModule({
  declarations: [UiDividerComponent],
  imports: [
    CommonModule,
    DividerModule
  ],
  exports: [UiDividerComponent]
})
export class UiDividerModule {
}
