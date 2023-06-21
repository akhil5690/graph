import {Component, Input,ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'cym-div',
  templateUrl: './cym-div.component.html',
  styleUrls: ['./cym-div.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CymDivComponent {
  @Input() cymClass!: string;
}
