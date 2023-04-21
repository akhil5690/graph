import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AuthComponent} from "./auth.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import {SettingsComponent} from './settings/settings.component';
import {SettingModule} from "../../../widgets/setting/setting.module";

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
        path: 'settings',
        component: SettingsComponent,
      },
    ]
  }
]

@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SettingModule,
  ],
  exports: [SettingsComponent]
})
export class AuthModule {
}
