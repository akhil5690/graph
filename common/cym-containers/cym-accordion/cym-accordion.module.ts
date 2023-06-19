import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CymAccordionComponent} from "./cym-accordion.component";
import {AccordionModule} from "primeng/accordion";


@NgModule({
  declarations: [CymAccordionComponent],
  imports: [
    CommonModule,
    AccordionModule
  ],
  exports: [CymAccordionComponent]
})
export class CymAccordionModule {
}
