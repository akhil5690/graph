import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SettingComponent} from "./setting.component";
import {WidgetFrameModule} from "../../../../../../common/ui-component/frames/widget-frame/widget-frame.module";
import {SidebarComponent} from "../../../../../../common/ui-component/sidebar/sidebar.component";
import {IframeComponent} from "../../../../../../common/ui-component/iframe/iframe.component";


@NgModule({
  declarations: [SettingComponent, SidebarComponent, IframeComponent],
  imports: [
    CommonModule,
    WidgetFrameModule
  ],
  exports:[SettingComponent]
})
export class SettingModule { }
