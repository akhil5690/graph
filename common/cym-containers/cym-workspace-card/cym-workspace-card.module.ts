import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CymWorkspaceCardComponent} from "./cym-workspace-card.component";

@NgModule({
  declarations: [CymWorkspaceCardComponent],
  imports: [
    CommonModule,
  ],
  exports: [CymWorkspaceCardComponent]
})
export class CymWorkspaceCardModule {
}
