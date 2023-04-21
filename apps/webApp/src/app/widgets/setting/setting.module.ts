import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SettingComponent} from "./setting.component";
import {WidgetFrameModule} from "../../../../../../common/ui-component/frames/widget-frame/widget-frame.module";


@NgModule({
  declarations: [SettingComponent],
  imports: [
    CommonModule,
    WidgetFrameModule
  ],
  exports:[SettingComponent]
})
export class SettingModule { }
