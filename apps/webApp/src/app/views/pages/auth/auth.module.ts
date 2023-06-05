import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AuthComponent} from "./auth.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import { SignUpComponent } from './sign-up/sign-up.component';
import {SignUpWidgetComponent} from "../../../widgets/sign-up-widget/sign-up-widget.component";

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: SignInComponent,
      },
      {
        path: 'signUp',
        component: SignUpComponent,
      },

    ]
  }
]

@NgModule({
  declarations: [

    SignUpComponent,
    SignUpWidgetComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: []
})
export class AuthModule {
}
