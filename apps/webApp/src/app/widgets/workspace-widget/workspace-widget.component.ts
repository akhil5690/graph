import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {workSpaceService} from "../../../../../../common/cym-services/workspace/workspace.service";

@Component({
  selector: 'cym-workspace-widget',
  templateUrl: './workspace-widget.component.html',
  styleUrls: ['./workspace-widget.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WorkspaceWidgetComponent implements OnInit {
  workspaceRes: any;

  workspaceNoData: any = [{
    name: "Observables",
    cardDivision: [{
      image: "assets/image/find_workspace.svg",
      subHeader2: "No new Observables"
    },]
  },
    {
      name: "Tasks",
      cardDivision: [{
        image: "assets/image/clipboard_workspace.svg",
        subHeader2: "You don't have any new tasks"
      },]
    },
    {
      name: "Shared with Me",
      cardDivision: [{
        image: "assets/image/folder_workspace.svg",
        subHeader2: "No files shared with you yet"
      }],
    },
  ];
  workspaceData: any = [{
    name: "Observables",
    list: [{
      desc: "Graph Node 'qa-cymonix-instance' health check is now critical",
      observedOnDate: "15/06/2023",
      observedOnTime: '14:20 IST'
    }, {
      desc: "Graph Node 'qa-cymonix-instance' health check is now critical",
      observedOnDate: "15/06/2023",
      observedOnTime: '14:20 IST'
    }, {
      desc: "Graph Node 'qa-cymonix-instance' health check is now critical",
      observedOnDate: "15/06/2023",
      observedOnTime: '14:20 IST'
    }, {
      desc: "Graph Node 'qa-cymonix-instance' health check is now critical",
      observedOnDate: "15/06/2023",
      observedOnTime: '14:20 IST'
    }, {
      desc: "Graph Node 'qa-cymonix-instance' health check is now critical",
      observedOnDate: "15/06/2023",
      observedOnTime: '14:20 IST'
    },]
  },
    {
      name: "Tasks",
      list: [{
        taskName: "assets/image/clipboard_workspace.svg",
        desc: '',
        status: "You don't have any new tasks",
      },]
    },
    {
      name: "Shared with Me",
      cardDivision: [{
        image: "assets/image/folder_workspace.svg",
        subHeader2: "No files shared with you yet"
      }],
    },
  ];
  sub = {
    image: "assets/image/Layer-6.svg",
    subHeader1: "No Workspace created or shared yet",
    subHeader2: "Create your first workspace here!"
  };

  constructor(private router: Router, private workSpaceService: workSpaceService) {
  }

  ngOnInit() {
    this.getWorkSpace();

  }

  goToDashboard() {
    this.router.navigate(['/launchpad']).then();
  }

  getWorkSpace() {
    this.workSpaceService.getAllWorkspace({
      'org-id': '6',
      'user-id': '7'
    }).then((res) => {
      this.workspaceRes = res;
    }).catch((e) => {
      console.log(e);
    })
  }
}

