import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CymCardDivisionComponent} from "./cym-card-division.component";
import {CymCardModule} from "../cym-card/cym-card.module";
import {CardModule} from "primeng/card";
import {CymDivModule} from "../cym-div/cym-div.module";
import {RouterLink} from "@angular/router";


@NgModule({
  declarations: [CymCardDivisionComponent],
    imports: [
        CommonModule,
        CymCardModule,
        CardModule,
        CymDivModule,
        RouterLink,
    ],
  exports: [CymCardDivisionComponent]
})
export class CymCardDivisionModule {
}
