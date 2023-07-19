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
      observedOnDate: "Observed on: 15/06/2023,",
      observedOnTime: '14:20 IST'
    }, {
      desc: "Graph Node 'qa-cymonix-instance' health check is now critical",
      observedOnDate: "Observed on: 15/06/2023,",
      observedOnTime: '14:20 IST'
    }, {
      desc: "Graph Node 'qa-cymonix-instance' health check is now critical",
      observedOnDate: "Observed on: 15/06/2023,",
      observedOnTime: '14:20 IST'
    }, {
      desc: "Graph Node 'qa-cymonix-instance' health check is now critical",
      observedOnDate: "Observed on: 15/06/2023,",
      observedOnTime: '14:20 IST'
    }, {
      desc: "Graph Node 'qa-cymonix-instance' health check is now critical",
      observedOnDate: "Observed on: 15/06/2023,",
      observedOnTime: '14:20 IST'
    }]
  },{
    name: "Tasks",
    list: [{
      label: "Port 22 is open",
      des:"Block port 22 for graph node 'qa-cymonix-id-balancer'",
      name: "Assigned to : You",
      dueTime: 'Due today'
    }, {
      label: "SSL Renewal",
      des:"SSL is not installed on loadbalancers in graph node 'ca-Cymonix-id-balancer'",
      name: "Assigned to : Abhay",
      dueTime: 'Due tomorrow'
    }, {
      label: "Review Findings",
      des:"Review all findings from IAM analysers and AWS Inspector effected nodes...",
      name: "Assigned to : Pradeep",
      dueTime: 'By: 05.08.2023'
    }]
  }, {
    name: "Shared with Me",
    cardDivision: [{
      image: "assets/image/folder_workspace.svg",
      subHeader2: "No files shared with you yet"
    }],
  }];
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
      console.log(this.workspaceRes,"workspaceRes")
    }).catch((e) => {
      console.log(e);
    })
  }
}

