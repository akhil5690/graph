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
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {workSpaceService} from "../../../../../../common/cym-services/workspace/workspace.service";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {GraphModule} from "../../../../../../common/cym-component/graph/graph.module";
import {RightSidebarModule} from "../../../../../../common/cym-component/right-sidebar/right-sidebar.module";
import {TabViewModule} from "primeng/tabview";
import {GraphEditorModule} from "../../../../../../common/cym-component/graph-editor/graph-editor.module";
import {DialogModule} from "primeng/dialog";
import {ToastModule} from "primeng/toast";
import {
  CymSecondaryToolbarModule
} from "../../../../../../common/cym-containers/cym-secondary-toolbar/cym-secondary-toolbar.module";
import {CymInputModule} from "../../../../../../common/cym-component/form/cym-input/cym-input.module";


@NgModule({
  declarations: [WorkspaceWidgetComponent],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    SignInModule,
    GraphModule,
    RightSidebarModule,
    HttpClientModule,
    WidgetFrameModule,
    TabViewModule,
    GraphEditorModule,
    DialogModule,
    ToastModule,
    CymDivModule,
    TopToolbarModule,
    CymSecondaryToolbarModule,
    CymInputModule,
    CymWorkspaceCardModule,CymWorkspaceCardDivisionModule
  ],
  providers:[workSpaceService, HttpHandler],
  exports: [WorkspaceWidgetComponent]
})
export class WorkspaceWidgetModule { }
