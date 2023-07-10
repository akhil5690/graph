import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GraphService} from "../../../../../../common/cym-services/graph/graph.service";
import {HttpHandler} from "../../../../../../common/utils/httpHandler";
import {WorkspaceWidgetComponent} from "./workspace-widget.component";
import {WidgetFrameModule} from "../../../../../../common/cym-component/frames/widget-frame/widget-frame.module";
import {CymDivModule} from "../../../../../../common/cym-containers/cym-div/cym-div.module";
import {
  CymWorkspaceCardModule
} from "../../../../../../common/cym-containers/cym-workspace-card/cym-workspace-card.module";
import {
  CymWorkspaceCardDivisionModule
} from "../../../../../../common/cym-containers/cym-workspace-card-division/cym-workspace-card-division.module";
import {SignInModule} from "../sign-in/sign-in.module";
import {TopToolbarModule} from "../../../../../../common/cym-component/frames/top-toolbar/top-toolbar.module";


@NgModule({
  declarations: [WorkspaceWidgetComponent],
  imports: [
    CommonModule,
    WidgetFrameModule,

    CymDivModule,
    CymWorkspaceCardModule,
    CymWorkspaceCardDivisionModule,
    SignInModule,
    TopToolbarModule,
  ],
  providers:[GraphService,HttpHandler],
  exports: [WorkspaceWidgetComponent]
})
export class WorkspaceWidgetModule { }
