import { Component } from '@angular/core';

@Component({
  selector: 'cym-dialog',
  templateUrl: './cym-dialog.component.html',
  styleUrls: ['./cym-dialog.component.scss']
})
export class CymDialogComponent {
  visible = false;

  closeDialog(): void {
    this.visible = false;
  }
  showDialog() {
    this.visible = true;
  }
}
