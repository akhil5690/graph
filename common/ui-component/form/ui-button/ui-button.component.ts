import {Component, Input} from '@angular/core';

@Component({
  selector: 'ui-button',
  templateUrl: './ui-button.component.html',
  styleUrls: ['./ui-button.component.scss']
})
export class UiButtonComponent {
  @Input() label!: string;
  @Input() class!: string;

  constructor() {
  }
}
