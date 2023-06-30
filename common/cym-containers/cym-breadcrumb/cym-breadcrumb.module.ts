import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CymBreadcrumbComponent} from "./cym-breadcrumb.component";
import {BreadcrumbModule} from "primeng/breadcrumb";


@NgModule({
  declarations: [CymBreadcrumbComponent],
  imports: [
    CommonModule,
    BreadcrumbModule
  ],
  exports: [CymBreadcrumbComponent]
})
export class CymBreadcrumbModule {
}
