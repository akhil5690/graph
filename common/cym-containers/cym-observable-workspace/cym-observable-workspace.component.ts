import {Component, Input} from '@angular/core';

@Component({
  selector: 'cym-observable-workspace',
  templateUrl: './cym-observable-workspace.component.html',
  styleUrls: ['./cym-observable-workspace.component.scss']
})
export class CymObservableWorkspaceComponent {
  @Input() cymClass: any;
  @Input() observableData: any;
}
