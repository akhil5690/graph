import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "../../../../common/ui-common/auth.guard";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../../../webApp/src/app/views/pages/auth/auth.module')
      .then(m => m.AuthModule)
  }, {
    path: '',
    canActivate:[AuthGuard],
    loadChildren: () => import('../../../webApp/src/app/views/pages/dashboard/dashboard.module')
      .then(m => m.DashboardModule)
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
