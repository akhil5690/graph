import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GraphEditorComponent} from "./graph-editor.component";
import {RightSidebarModule} from "../right-sidebar/right-sidebar.module";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {OverviewComponent} from "../overview/overview.component";

@NgModule({
  declarations: [GraphEditorComponent, OverviewComponent],
  imports: [
    CommonModule,
    RightSidebarModule,
    DropdownModule,
    FormsModule
  ], exports: [GraphEditorComponent]
})
export class GraphEditorModule {
}
