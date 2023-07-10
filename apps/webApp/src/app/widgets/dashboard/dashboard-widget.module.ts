import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardWidgetComponent} from "./dashboard-widget.component";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {SignInModule} from "../sign-in/sign-in.module";
import {GraphModule} from "../../../../../../common/cym-component/graph/graph.module";
import {HttpClientModule} from "@angular/common/http";
import {GraphService} from "../../../../../../common/cym-services/graph/graph.service";
import {WidgetFrameModule} from "../../../../../../common/cym-component/frames/widget-frame/widget-frame.module";
import {RightSidebarModule} from "../../../../../../common/cym-component/right-sidebar/right-sidebar.module";
import {HttpHandler} from "../../../../../../common/utils/httpHandler";
import {TabViewModule} from "primeng/tabview";
import {GraphEditorModule} from "../../../../../../common/cym-component/graph-editor/graph-editor.module";
import {DialogModule} from "primeng/dialog";
import {ToastModule} from "primeng/toast";
import {CymDivModule} from "../../../../../../common/cym-containers/cym-div/cym-div.module";
import {TopToolbarModule} from "../../../../../../common/cym-component/frames/top-toolbar/top-toolbar.module";


@NgModule({
  declarations: [DashboardWidgetComponent],
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
  ],
  providers:[GraphService,HttpHandler],
  exports: [DashboardWidgetComponent]
})
export class DashboardWidgetModule { }
