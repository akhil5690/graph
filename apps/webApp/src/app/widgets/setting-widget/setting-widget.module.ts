import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingWidgetComponent} from "./setting-widget.component";
import {SidebarComponent} from "../../../../../../common/ui-component/sidebar/sidebar.component";
import {IframeComponent} from "../../../../../../common/ui-component/iframe/iframe.component";
import {TopToolbarComponent} from "../../../../../../common/ui-component/frames/top-toolbar/top-toolbar.component";
import {
  BottomToolbarComponent
} from "../../../../../../common/ui-component/frames/bottom-toolbar/bottom-toolbar.component";
import {WidgetFrameModule} from "../../../../../../common/ui-component/frames/widget-frame/widget-frame.module";
import {GraphModule} from "../../../../../../common/ui-component/graph/graph.module";

@NgModule({
  declarations: [SettingWidgetComponent, SidebarComponent, IframeComponent, TopToolbarComponent, BottomToolbarComponent],
  imports: [
    CommonModule,
    WidgetFrameModule,
    GraphModule
  ],
  exports: [SettingWidgetComponent]
})
export class SettingWidgetModule {
}
