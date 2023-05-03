import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GraphComponents} from "./graph.component";



@NgModule({
  declarations: [GraphComponents],
  imports: [
    CommonModule
  ],
  exports:[GraphComponents]
})
export class GraphModule { }
