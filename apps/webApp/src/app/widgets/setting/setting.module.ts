import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SettingComponent} from "./setting.component";
import {WidgetFrameModule} from "../../../../../../common/ui-component/frames/widget-frame/widget-frame.module";
import {SidebarComponent} from "../../../../../../common/ui-component/sidebar/sidebar.component";
import {IframeComponent} from "../../../../../../common/ui-component/iframe/iframe.component";
import {TopToolbarComponent} from "../../../../../../common/ui-component/frames/top-toolbar/top-toolbar.component";
import {
  BottomToolbarComponent
} from "../../../../../../common/ui-component/frames/bottom-toolbar/bottom-toolbar.component";
import {InputTextModule} from "primeng/inputtext";


@NgModule({
  declarations: [SettingComponent, SidebarComponent, IframeComponent, TopToolbarComponent, BottomToolbarComponent],
  imports: [
    CommonModule,
    WidgetFrameModule,
    InputTextModule
  ],
  exports:[SettingComponent]
})
export class SettingModule { }
