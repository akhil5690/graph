import {Component} from '@angular/core';
import {ConfirmationService, ConfirmEventType, MessageService} from "primeng/api";

@Component({
  selector: 'cym-confirm-dialog',
  templateUrl: './cym-confirm-dialog.component.html',
  styleUrls: ['./cym-confirm-dialog.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class CymConfirmDialogComponent {
  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {
  }

  confirm1() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({severity: 'info', summary: 'Confirmed', detail: 'You have accepted'});
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({severity: 'error', summary: 'Rejected', detail: 'You have rejected'});
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled'});
            break;
        }
      }
    });
  }

}
