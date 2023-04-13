import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {SignInModule} from "./widgets/sign-in/sign-in.module";
import { AuthComponent } from './views/pages/auth/auth.component';
import { SignInComponent } from './views/pages/auth/sign-in/sign-in.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    SignInModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
