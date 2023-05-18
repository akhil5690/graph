import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RightSidebarComponent} from "./right-sidebar.component";
import {TableModule} from "primeng/table";



@NgModule({
    declarations: [
        RightSidebarComponent
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
