import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {DashboardWidgetModule} from "../../../widgets/dashboard/dashboard-widget.module";
import {dashboardComponent} from "./dashboard/dashboard.component";
import {DashboardComponent} from "./dashboard.component";
import {LaunchpadComponent} from "./launchpad/launchpad.component";
import {LaunchpadWidgetModule} from "../../../widgets/launchpad-widget/launchpad-widget.module";

const routes: Routes = [
  { path: '',
    component: DashboardComponent,
    children: [{
      path: '',
      component: LaunchpadComponent,
    },{
      path: 'dashboard',
      component: dashboardComponent,
    },]},

]

@NgModule({
  declarations: [
    dashboardComponent,LaunchpadComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DashboardWidgetModule,
    LaunchpadWidgetModule,
  ],
  exports: [dashboardComponent,LaunchpadComponent]
})
export class DashboardModule {
}
