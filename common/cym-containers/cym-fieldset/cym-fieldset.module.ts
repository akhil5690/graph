import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CymFieldsetComponent} from "./cym-fieldset.component";
import {FieldsetModule} from "primeng/fieldset";


@NgModule({
  declarations: [CymFieldsetComponent],
  imports: [
    CommonModule,
    FieldsetModule
  ],
  exports: [CymFieldsetComponent]
})
export class CymFieldsetModule {
}
