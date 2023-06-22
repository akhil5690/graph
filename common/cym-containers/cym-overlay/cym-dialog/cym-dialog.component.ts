import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'cym-dialog',
  templateUrl: './cym-dialog.component.html',
  styleUrls: ['./cym-dialog.component.scss']
})
export class CymDialogComponent {
  @Input() propertyMetaData: any = '';
  @Output() dialogEvent: EventEmitter<string> = new EventEmitter();
  visible = false;

  closeDialog(): void {
    this.visible = false;
    this.dialogEvent.emit('Close');
  }

  showDialog() {
    this.visible = true;
    this.dialogEvent.emit('Show');
  }
}
