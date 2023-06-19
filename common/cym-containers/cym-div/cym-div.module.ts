import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CymDivComponent} from "./cym-div.component";


@NgModule({
  declarations: [CymDivComponent],
  imports: [
    CommonModule,
  ],
  exports: [CymDivComponent]
})
export class CymDivModule{
}
