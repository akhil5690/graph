import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GraphService} from "../../../../../../common/cym-services/graph/graph.service";
import {HttpHandler} from "../../../../../../common/utils/httpHandler";
import {WorkspaceWidgetComponent} from "./workspace-widget.component";


@NgModule({
  declarations: [WorkspaceWidgetComponent],
  imports: [
    CommonModule,
  ],
  providers:[GraphService,HttpHandler],
  exports: [WorkspaceWidgetComponent]
})
export class WorkspaceWidgetModule { }
