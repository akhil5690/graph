import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-ui-fieldset',
  templateUrl: './ui-fieldset.component.html',
  styleUrls: ['./ui-fieldset.component.scss']
})
export class UiFieldsetComponent implements OnInit {
  @Input() fieldsetData:any;
  @Input() fieldsetDataText:any;
  ngOnInit() {
  }
}
