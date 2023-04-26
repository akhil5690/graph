import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetFrameComponent } from './widget-frame.component';
import {ToggleButtonModule} from "primeng/togglebutton";
import {FormsModule} from "@angular/forms";
import {UiInputComponent} from "../../form/ui-input/ui-input.component";
import {InputTextModule} from "primeng/inputtext";



@NgModule({
    declarations: [
        WidgetFrameComponent,
        UiInputComponent
    ],
    exports: [
        WidgetFrameComponent,
        UiInputComponent
    ],
    imports: [
        CommonModule,
        ToggleButtonModule,
        FormsModule,
        InputTextModule
    ]
})
export class WidgetFrameModule { }
