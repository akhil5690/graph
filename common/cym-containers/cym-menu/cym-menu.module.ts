import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuModule} from "primeng/menu";
import {CymMenuComponent} from "./cym-menu.component";
import {ToastModule} from "primeng/toast";
import {ButtonModule} from "primeng/button";
import {SignInModule} from "../../../apps/webApp/src/app/widgets/sign-in/sign-in.module";


@NgModule({
  declarations: [CymMenuComponent],
  imports: [
    CommonModule,
    MenuModule,
    ToastModule,
    ButtonModule,
    SignInModule
  ],
  exports: [CymMenuComponent]
})
export class CymMenuModule {
}
