import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LaunchpadWidgetComponent} from "./launchpad-widget.component";
import {DashboardWidgetModule} from "../dashboard/dashboard-widget.module";
// import {GraphComponents} from "../../../../../../common/cym-component/graph/graph.component";
import {CymCardModule} from "../../../../../../common/cym-containers/cym-card/cym-card.module";
import {CymDivModule} from "../../../../../../common/cym-containers/cym-div/cym-div.module";
import {WidgetFrameModule} from "../../../../../../common/cym-component/frames/widget-frame/widget-frame.module";
import {CymToolbarModule} from "../../../../../../common/cym-containers/cym-toolbar/cym-toolbar.module";
import {
    CymCardDivisionModule
} from "../../../../../../common/cym-containers/cym-card-division/cym-card-division.module";
import {CymProfileModule} from "../../../../../../common/cym-containers/cym-profile/cym-profile.module";
import {CymInputModule} from "../../../../../../common/cym-component/form/cym-input/cym-input.module";
import {
    CymSecondaryToolbarModule
} from "../../../../../../common/cym-containers/cym-secondary-toolbar/cym-secondary-toolbar.module";
import {TopToolbarModule} from "../../../../../../common/cym-component/frames/top-toolbar/top-toolbar.module";


@NgModule({
  declarations: [LaunchpadWidgetComponent],
  imports: [
    CommonModule,
    DashboardWidgetModule,
    CymCardModule,
    CymDivModule,
    WidgetFrameModule,
    CymToolbarModule,
    CymCardDivisionModule,
    CymProfileModule,
    CymInputModule,
    CymSecondaryToolbarModule,
    TopToolbarModule
  ],
    exports: [LaunchpadWidgetComponent]
})
export class LaunchpadWidgetModule { }
