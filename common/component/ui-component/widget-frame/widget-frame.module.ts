import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetFrameComponent } from './widget-frame.component';



@NgModule({
  declarations: [
    WidgetFrameComponent
  ],
  exports: [
    WidgetFrameComponent
  ],
  imports: [
    CommonModule
  ]
})
export class WidgetFrameModule { }
