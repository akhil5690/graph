import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CymTasksWorkspaceComponent} from "./cym-tasks-workspace.component";
import {CymDividerModule} from "../cym-divider/cym-divider.module";


@NgModule({
  declarations: [CymTasksWorkspaceComponent],
  imports: [
    CommonModule,
    CymDividerModule,
  ],
  exports: [CymTasksWorkspaceComponent]
})
export class CymTasksWorkspaceModule {
}
