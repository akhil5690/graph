import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RightSidebarComponent} from "./right-sidebar.component";
import {TableModule} from "primeng/table";
import {TableComponent} from "../table/table.component";

@NgModule({
  declarations: [
    RightSidebarComponent,
    TableComponent
  ],
    exports: [
        RightSidebarComponent
    ],
  imports: [
    CommonModule,
    TableModule
  ]
})
export class RightSidebarModule { }
