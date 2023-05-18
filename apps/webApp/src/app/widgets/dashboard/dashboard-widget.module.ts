import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardWidgetComponent} from "./dashboard-widget.component";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {SignInModule} from "../sign-in/sign-in.module";
import {GraphModule} from "../../../../../../common/ui-component/graph/graph.module";
import {HttpClientModule} from "@angular/common/http";
import {GraphService} from "../../../../../../common/ui-services/graph/graph.service";
import {WidgetFrameModule} from "../../../../../../common/ui-component/frames/widget-frame/widget-frame.module";


@NgModule({
  declarations: [DashboardWidgetComponent],
    imports: [
        CommonModule,
        InputTextModule,
        ButtonModule,
        SignInModule,
        GraphModule,
        HttpClientModule,
        WidgetFrameModule,
    ],
  providers:[GraphService],
  exports: [DashboardWidgetComponent]
})
export class DashboardWidgetModule { }
