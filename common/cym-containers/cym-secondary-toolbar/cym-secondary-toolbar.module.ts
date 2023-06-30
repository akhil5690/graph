import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CymSecondaryToolbarComponent} from "./cym-secondary-toolbar.component";
import {CymBreadcrumbModule} from "../cym-breadcrumb/cym-breadcrumb.module";


@NgModule({
  declarations: [CymSecondaryToolbarComponent],
  imports: [
    CommonModule,
    CymBreadcrumbModule,
  ],
  exports: [CymSecondaryToolbarComponent]
})
export class CymSecondaryToolbarModule {
}
