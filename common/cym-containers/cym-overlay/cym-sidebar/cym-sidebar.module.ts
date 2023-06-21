import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CymSidebarComponent} from "./cym-sidebar.component";
import {SidebarModule} from "primeng/sidebar";
import {ButtonModule} from "primeng/button";

@NgModule({
  declarations: [CymSidebarComponent],
  imports: [
    CommonModule,
    SidebarModule,
    ButtonModule,
  ],
  exports: [CymSidebarComponent]
})
export class CymSidebarModule {
}
