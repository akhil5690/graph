import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SettingComponent} from "./setting.component";
import {WidgetFrameModule} from "../../../../../../common/ui-component/frames/widget-frame/widget-frame.module";
import {SidebarComponent} from "../../../../../../common/ui-component/sidebar/sidebar.component";


@NgModule({
  declarations: [SettingComponent, SidebarComponent],
  imports: [
    CommonModule,
    WidgetFrameModule
  ],
  exports:[SettingComponent]
})
export class SettingModule { }
