import { Component } from '@angular/core';
import {MessageService} from "primeng/api";
interface UploadEvent {
  originalEvent: Event;
  files: File[];
}
@Component({
  selector: 'cym-file-upload',
  templateUrl: './cym-file-upload.component.html',
  styleUrls: ['./cym-file-upload.component.scss'],
  providers: [MessageService]
})
export class CymFileUploadComponent {
  constructor(private messageService: MessageService) { }
  onBasicUploadAuto(event: UploadEvent) {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Auto Mode' });
    console.log(event,"event");
  }
}
