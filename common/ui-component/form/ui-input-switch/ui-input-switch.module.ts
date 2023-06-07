import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UiInputSwitchComponent} from "./ui-input-switch.component";
import {InputSwitchModule} from "primeng/inputswitch";


@NgModule({
  declarations: [UiInputSwitchComponent],
  imports: [
    CommonModule,
    InputSwitchModule
  ],
  exports: [UiInputSwitchComponent]
})
export class UiInputSwitchModule {
}
