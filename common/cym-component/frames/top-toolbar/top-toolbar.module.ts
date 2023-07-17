import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TopToolbarComponent } from "./top-toolbar.component";
import {LoggedInUserComponentModule} from "../../details/logged-in-user/logged-in-user.module";



@NgModule({
  declarations: [TopToolbarComponent],
    imports: [
        CommonModule,
        LoggedInUserComponentModule
    ],
  exports:[TopToolbarComponent]

})
export class TopToolbarModule { }
