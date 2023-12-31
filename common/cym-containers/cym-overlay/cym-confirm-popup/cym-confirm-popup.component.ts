import {Component} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'cym-confirm-popup',
  templateUrl: './cym-confirm-popup.component.html',
  styleUrls: ['./cym-confirm-popup.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class CymConfirmPopupComponent {
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
  }

  confirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({severity: 'info', summary: 'Confirmed', detail: 'You have accepted'});
      },
      reject: () => {
        this.messageService.add({severity: 'error', summary: 'Rejected', detail: 'You have rejected'});
      }
    });
  }

}
