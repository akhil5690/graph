import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CymFileUploadComponent} from "./cym-file-upload.component";
import {FileUploadModule} from "primeng/fileupload";


@NgModule({
  declarations: [CymFileUploadComponent],
  imports: [
    CommonModule,
    FileUploadModule
  ],
  exports: [CymFileUploadComponent]
})
export class CymFileUploadModule {
}
