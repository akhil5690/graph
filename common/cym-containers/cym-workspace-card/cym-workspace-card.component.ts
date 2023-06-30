import {Component, Input} from '@angular/core';

@Component({
  selector: 'cym-workspace-card',
  templateUrl: './cym-workspace-card.component.html',
  styleUrls: ['./cym-workspace-card.component.scss']
})
export class CymWorkspaceCardComponent {
  @Input() cymClass: any;
}
