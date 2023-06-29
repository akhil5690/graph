import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';
import {CymProgressBarComponent} from "./cym-progress-bar.component";

@NgModule({
  declarations: [CymProgressBarComponent],
  imports: [
    CommonModule,
    ProgressBarModule
  ],
  exports: [CymProgressBarComponent]
})
export class CymProgressBarModule {
}
