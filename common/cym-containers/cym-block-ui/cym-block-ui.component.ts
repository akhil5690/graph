import { Component } from '@angular/core';

@Component({
  selector: 'cym-block-ui',
  templateUrl: './cym-block-ui.component.html',
  styleUrls: ['./cym-block-ui.component.scss']
})
export class CymBlockUiComponent {
  blockedDocument: boolean = false;

  blockDocument() {
    this.blockedDocument = true;
    setTimeout(() => {
      this.blockedDocument = false;
    }, 3000);
  }
}
