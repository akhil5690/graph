import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetFrameComponent } from './widget-frame.component';
import {ToggleButtonModule} from "primeng/togglebutton";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    WidgetFrameComponent
  ],
  exports: [
    WidgetFrameComponent
  ],
  imports: [
    CommonModule,
    ToggleButtonModule,
    FormsModule
  ]
})
export class WidgetFrameModule { }
