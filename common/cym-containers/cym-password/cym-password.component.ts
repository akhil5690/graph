import {Component, Input, OnChanges} from '@angular/core';

@Component({
  selector: 'cym-password',
  templateUrl: './cym-password.component.html',
  styleUrls: ['./cym-password.component.scss']
})
export class CymPasswordComponent implements OnChanges{
  @Input() propertyMeta!:any;
  value!: string;
  ngOnChanges(): void {
  }
}
