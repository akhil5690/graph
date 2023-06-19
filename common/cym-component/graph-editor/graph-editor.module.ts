import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GraphEditorComponent} from "./graph-editor.component";
import {RightSidebarModule} from "../right-sidebar/right-sidebar.module";

@NgModule({
  declarations: [GraphEditorComponent],
  imports: [
    CommonModule,
    RightSidebarModule
  ], exports: [GraphEditorComponent]
})
export class GraphEditorModule {
}
