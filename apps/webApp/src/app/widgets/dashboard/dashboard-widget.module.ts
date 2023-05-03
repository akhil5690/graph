import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardWidgetComponent} from "./dashboard-widget.component";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {SignInModule} from "../sign-in/sign-in.module";
import {GraphModule} from "../../../../../../common/ui-component/graph/graph.module";


@NgModule({
  declarations: [DashboardWidgetComponent],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    SignInModule,
    GraphModule,
  ],
  exports: [DashboardWidgetComponent]
})
export class DashboardWidgetModule { }
