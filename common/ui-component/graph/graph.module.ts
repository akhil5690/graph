import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GraphComponents} from "./graph.component";
import {DialogModule} from "primeng/dialog";
import {TableModule} from "primeng/table";



@NgModule({
  declarations: [GraphComponents],
    imports: [
        CommonModule,
        DialogModule,
        TableModule
    ],
  exports:[GraphComponents]
})
export class GraphModule { }
