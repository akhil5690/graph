import {Component, Input} from '@angular/core';

@Component({
  selector: 'cym-button',
  templateUrl: './cym-button.component.html',
  styleUrls: ['./cym-button.component.scss']
})
export class CymButtonComponent {
  @Input() label!: string;
  @Input() class!: string;

  constructor() {
  }
}
