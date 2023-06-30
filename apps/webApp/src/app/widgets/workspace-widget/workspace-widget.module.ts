import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GraphService} from "../../../../../../common/cym-services/graph/graph.service";
import {HttpHandler} from "../../../../../../common/utils/httpHandler";
import {WorkspaceWidgetComponent} from "./workspace-widget.component";
import {WidgetFrameModule} from "../../../../../../common/cym-component/frames/widget-frame/widget-frame.module";
import {LaunchpadWidgetModule} from "../launchpad-widget/launchpad-widget.module";
import {CymCardModule} from "../../../../../../common/cym-containers/cym-card/cym-card.module";
import {CymDivModule} from "../../../../../../common/cym-containers/cym-div/cym-div.module";
import {
  CymCardDivisionModule
} from "../../../../../../common/cym-containers/cym-card-division/cym-card-division.module";


@NgModule({
  declarations: [WorkspaceWidgetComponent],
  imports: [
    CommonModule,
    WidgetFrameModule,
    LaunchpadWidgetModule,
    CymCardModule,
    CymDivModule,
    CymCardDivisionModule,
  ],
  providers:[GraphService,HttpHandler],
  exports: [WorkspaceWidgetComponent]
})
export class WorkspaceWidgetModule { }
