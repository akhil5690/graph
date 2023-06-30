import {Component, Input} from '@angular/core';

@Component({
  selector: 'cym-block-ui',
  templateUrl: './cym-block-ui.component.html',
  styleUrls: ['./cym-block-ui.component.scss']
})
export class CymBlockUiComponent {
  @Input() blockedDocument: boolean = false;
}
