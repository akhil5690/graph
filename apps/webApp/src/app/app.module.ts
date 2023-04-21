import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {SignInModule} from "./widgets/sign-in/sign-in.module";
import { AuthComponent } from './views/pages/auth/auth.component';
import { SignInComponent } from './views/pages/auth/sign-in/sign-in.component';
import { AppRoutingModule } from './app-routing.module';
import {WidgetFrameModule} from "../../../../common/ui-component/frames/widget-frame/widget-frame.module";
import { DashboardComponent } from './views/pages/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SignInComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    SignInModule,
    AppRoutingModule,
    WidgetFrameModule,
  ],
  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
