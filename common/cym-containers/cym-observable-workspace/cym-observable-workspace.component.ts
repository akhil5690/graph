import {Component, Input} from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'cym-observable-workspace',
  templateUrl: './cym-observable-workspace.component.html',
  styleUrls: ['./cym-observable-workspace.component.scss']
})
export class CymObservableWorkspaceComponent {
  @Input() cymClass: any;
  @Input() observableData: any;

  getFormattedDate(value: any) {
    return moment(value).format('MMMM Do YYYY, h:mm:ss a');
  }
}
