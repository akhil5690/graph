import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CymDropdownComponent} from "./cym-dropdown.component";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [CymDropdownComponent],
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule
  ],
  exports: [CymDropdownComponent]
})
export class CymDropdownModule {
}
