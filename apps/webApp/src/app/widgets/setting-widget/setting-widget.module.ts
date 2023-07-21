import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingWidgetComponent} from "./setting-widget.component";

@NgModule({
  declarations: [SettingWidgetComponent],
  imports: [
    CommonModule
  ],
  exports: [SettingWidgetComponent]
})
export class SettingWidgetModule {
}
