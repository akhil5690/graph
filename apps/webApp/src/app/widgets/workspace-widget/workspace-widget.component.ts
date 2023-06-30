import { Component } from '@angular/core';

@Component({
  selector: 'cym-workspace-widget',
  templateUrl: './workspace-widget.component.html',
  styleUrls: ['./workspace-widget.component.scss']
})
export class WorkspaceWidgetComponent {
  workspace: any = [{
    name: "Observables",
    cardDivision: [{
      image: "assets/image/find_workspace.svg",
      subHeader2:"No new Observables"
    },]
  },
    {
      name: "Tasks",
      cardDivision: [{
        image: "assets/image/clipboard_workspace.svg",

        subHeader2:"You don't have any new tasks"
      },]
    },
    {
      name: "Shared with Me",
      cardDivision: [{
        image:  "assets/image/folder_workspace.svg",
        subHeader2: "No files shared with you yet"
      }],
    },
    {
      name: null,
      cardDivision: [{
        image:  "assets/image/Layer-6.svg",
        subHeader1: "No Workspace created or shared yet",
        subHeader2: "Create your first workspace here!"
      }],
    }]
}
