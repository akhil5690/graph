import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'cym-fieldset',
  templateUrl: './cym-fieldset.component.html',
  styleUrls: ['./cym-fieldset.component.scss']
})
export class CymFieldsetComponent implements OnInit {
  @Input() fieldsetData:any;
  @Input() fieldsetDataText:any;
  ngOnInit() {
  }
}
