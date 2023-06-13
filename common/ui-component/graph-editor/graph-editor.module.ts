import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GraphEditorComponent} from "./graph-editor.component";

@NgModule({
  declarations: [GraphEditorComponent],
  imports: [
    CommonModule
  ], exports: [GraphEditorComponent]
})
export class GraphEditorModule {
}
