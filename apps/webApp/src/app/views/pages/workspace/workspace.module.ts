import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {WorkspaceComponent} from "./workspace.component";
import {WorkspaceWidgetModule} from "../../../widgets/workspace-widget/workspace-widget.module";

const routes: Routes = [
  { path: '',
    component: WorkspaceComponent
  }
]

@NgModule({
  declarations: [
    WorkspaceComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    WorkspaceWidgetModule,
  ],
  exports: [WorkspaceComponent]
})
export class WorkspaceModule {
}
