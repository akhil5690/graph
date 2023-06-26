import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CymCardDivisionComponent} from "./cym-card-division.component";
import {CymCardModule} from "../cym-card/cym-card.module";


@NgModule({
  declarations: [CymCardDivisionComponent],
  imports: [
    CommonModule,
    CymCardModule,
  ],
  exports: [CymCardDivisionComponent]
})
export class CymCardDivisionModule {
}
