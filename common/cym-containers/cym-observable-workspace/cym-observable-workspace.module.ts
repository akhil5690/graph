import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CymObservableWorkspaceComponent} from "./cym-observable-workspace.component";
import {CymDividerModule} from "../cym-divider/cym-divider.module";

@NgModule({
  declarations: [CymObservableWorkspaceComponent],
  imports: [
    CommonModule,
    CymDividerModule,
  ],
  exports: [CymObservableWorkspaceComponent]
})
export class CymObservableWorkspaceModule {
}
