import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GraphComponents} from "./graph.component";
import {DialogModule} from "primeng/dialog";



@NgModule({
  declarations: [GraphComponents],
    imports: [
        CommonModule,
        DialogModule
    ],
  exports:[GraphComponents]
})
export class GraphModule { }
