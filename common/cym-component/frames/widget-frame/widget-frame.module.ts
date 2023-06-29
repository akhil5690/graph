import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetFrameComponent } from './widget-frame.component';
import {ToggleButtonModule} from "primeng/togglebutton";
import {FormsModule} from "@angular/forms";
import {CymInputComponent} from "../../form/cym-input/cym-input.component";
import {InputTextModule} from "primeng/inputtext";
import {CymBlockUiModule} from "../../../cym-containers/cym-block-ui/cym-block-ui.module";
import {CymProgressBarModule} from "../../../cym-containers/cym-progress-bar/cym-progress-bar.module";



@NgModule({
    declarations: [
        WidgetFrameComponent,
    ],
    exports: [
        WidgetFrameComponent,
    ],
  imports: [
    CommonModule,
    ToggleButtonModule,
    FormsModule,
    InputTextModule,
    CymBlockUiModule,
    CymProgressBarModule
  ]
})
export class WidgetFrameModule { }
