import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UiAccordionComponent} from "./ui-accordion.component";
import {AccordionModule} from "primeng/accordion";


@NgModule({
  declarations: [UiAccordionComponent],
  imports: [
    CommonModule,
    AccordionModule
  ],
  exports: [UiAccordionComponent]
})
export class UiAccordionModule {
}
