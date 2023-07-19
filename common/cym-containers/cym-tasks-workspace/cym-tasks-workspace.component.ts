import {Component, Input} from '@angular/core';

@Component({
  selector: 'cym-tasks-workspace',
  templateUrl: './cym-tasks-workspace.component.html',
  styleUrls: ['./cym-tasks-workspace.component.scss']
})
export class CymTasksWorkspaceComponent {
  @Input() cymClass: any;
  @Input() taskData: any;
}
