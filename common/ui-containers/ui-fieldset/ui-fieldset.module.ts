import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UiFieldsetComponent} from "./ui-fieldset.component";
import {FieldsetModule} from "primeng/fieldset";


@NgModule({
  declarations: [UiFieldsetComponent],
  imports: [
    CommonModule,
    FieldsetModule
  ],
  exports: [UiFieldsetComponent]
})
export class UiFieldsetModule {
}
