import {Component, Input} from '@angular/core';

@Component({
  selector: 'cym-color-picker',
  templateUrl: './cym-color-picker.component.html',
  styleUrls: ['./cym-color-picker.component.scss']
})
export class CymColorPickerComponent {
  @Input() color!: string;
  @Input() cymClass!: string;
}
