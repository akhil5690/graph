import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {SettingModule} from "../../../widgets/setting/setting.module";
import {dashboardComponent} from "./dashboard/dashboard.component";
import {DashboardComponent} from "./dashboard.component";

const routes: Routes = [
  { path: '',
    component: DashboardComponent,
    children: [{
      path: '',
      component: dashboardComponent,
    },]},

]

@NgModule({
  declarations: [
    dashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SettingModule,
  ],
  exports: [dashboardComponent]
})
export class DashboardModule {
}
