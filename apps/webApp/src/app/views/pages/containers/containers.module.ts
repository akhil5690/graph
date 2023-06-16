import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LaunchpadWidgetModule} from "../../../widgets/launchpad-widget/launchpad-widget.module";
import {ContainersComponent} from "./containers.component";
import {ContainerWidgetModule} from "../../../widgets/container-widget/container-widget.module";

const routes: Routes = [
  { path: '',
    component: ContainersComponent
  }
]

@NgModule({
  declarations: [
    ContainersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ContainerWidgetModule,
  ],
  exports: [ContainersComponent]
})
export class ContainersModule {
}
