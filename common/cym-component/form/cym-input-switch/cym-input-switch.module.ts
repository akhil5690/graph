import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CymInputSwitchComponent} from "./cym-input-switch.component";
import {InputSwitchModule} from "primeng/inputswitch";


@NgModule({
  declarations: [CymInputSwitchComponent],
  imports: [
    CommonModule,
    InputSwitchModule
  ],
  exports: [CymInputSwitchComponent]
})
export class CymInputSwitchModule {
}
