import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LaunchpadWidgetComponent} from "./launchpad-widget.component";
import {DashboardWidgetModule} from "../dashboard/dashboard-widget.module";
import {GraphComponents} from "../../../../../../common/cym-component/graph/graph.component";


@NgModule({
  declarations: [LaunchpadWidgetComponent],
  imports: [
    CommonModule,
    DashboardWidgetModule
  ],
  exports: [LaunchpadWidgetComponent]
})
export class LaunchpadWidgetModule { }
