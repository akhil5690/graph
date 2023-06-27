import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GraphComponents} from "./graph.component";
import {DialogModule} from "primeng/dialog";
import {TableModule} from "primeng/table";
import {SidebarModule} from "primeng/sidebar";
import {RightSidebarModule} from "../right-sidebar/right-sidebar.module";
import {GraphEditorModule} from "../graph-editor/graph-editor.module";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [GraphComponents],
  imports: [
    CommonModule,
    DialogModule,
    TableModule,
    SidebarModule,
    RightSidebarModule,
    GraphEditorModule,
    DropdownModule,
    FormsModule
  ],
  exports:[GraphComponents]
})
export class GraphModule { }
