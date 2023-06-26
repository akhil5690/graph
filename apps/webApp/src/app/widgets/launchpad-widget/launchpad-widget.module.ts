import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LaunchpadWidgetComponent} from "./launchpad-widget.component";
import {DashboardWidgetModule} from "../dashboard/dashboard-widget.module";
import {GraphComponents} from "../../../../../../common/cym-component/graph/graph.component";
import {CymCardModule} from "../../../../../../common/cym-containers/cym-card/cym-card.module";
import {CymDivModule} from "../../../../../../common/cym-containers/cym-div/cym-div.module";
import {WidgetFrameModule} from "../../../../../../common/cym-component/frames/widget-frame/widget-frame.module";
import {CymToolbarModule} from "../../../../../../common/cym-containers/cym-toolbar/cym-toolbar.module";


@NgModule({
  declarations: [LaunchpadWidgetComponent],
    imports: [
        CommonModule,
        DashboardWidgetModule,
        CymCardModule,
        CymDivModule,
        WidgetFrameModule,
        CymToolbarModule
    ],
  exports: [LaunchpadWidgetComponent]
})
export class LaunchpadWidgetModule { }
