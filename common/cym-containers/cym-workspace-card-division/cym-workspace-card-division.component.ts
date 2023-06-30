import {Component, Input} from '@angular/core';

@Component({
  selector: 'cym-workspace-card-division',
  templateUrl: './cym-workspace-card-division.component.html',
  styleUrls: ['./cym-workspace-card-division.component.scss']
})
export class CymWorkspaceCardDivisionComponent {
  @Input() cymClass: any;
  @Input() workspaceCardDetails: any;
}
