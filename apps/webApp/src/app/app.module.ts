import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {SignInModule} from "./widgets/sign-in/sign-in.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SignInModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
