import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UiCardComponent} from "./ui-card.component";
import {CardModule} from "primeng/card";


@NgModule({
  declarations: [UiCardComponent],
  imports: [
    CommonModule,
    CardModule
  ],
  exports: [UiCardComponent]
})
export class UiCardModule {
}
