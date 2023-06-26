import {Component, Input} from '@angular/core';
import {MessageService} from "primeng/api";

@Component({
  selector: 'cym-toast',
  templateUrl: './cym-toast.component.html',
  styleUrls: ['./cym-toast.component.scss'],
  providers: [MessageService]
})
export class CymToastComponent {
  constructor(private messageService: MessageService) {}
  @Input() position:any='top-center';

  showSuccess() {

    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });

  }

  showInfo() {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Message Content' });
  }

  showWarn() {
    this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Message Content' });
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Message Content' });
  }
}
