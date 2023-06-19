import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CymCardComponent} from "./cym-card.component";
import {CardModule} from "primeng/card";


@NgModule({
  declarations: [CymCardComponent],
  imports: [
    CommonModule,
    CardModule
  ],
  exports: [CymCardComponent]
})
export class CymCardModule {
}
