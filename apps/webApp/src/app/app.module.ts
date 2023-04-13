import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {SignInModule} from "./widgets/sign-in/sign-in.module";
import { AuthComponent } from './views/pages/auth/auth.component';
import { SignInComponent } from './views/pages/auth/sign-in/sign-in.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    SignInModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
