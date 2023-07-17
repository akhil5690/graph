import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {workSpaceService} from "../../../../../../common/cym-services/workspace/workspace.service";

@Component({
  selector: 'cym-workspace-widget',
  templateUrl: './workspace-widget.component.html',
  styleUrls: ['./workspace-widget.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class WorkspaceWidgetComponent implements OnInit {
  workspaceRes: any;


  constructor(private router: Router, private workSpaceService: workSpaceService) {
  }

  ngOnInit() {
    this.getWorkSpace();
  }

  workspace: any = [{
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
  ]

  workspace1: any = [{
    name: null,
    cardDivision: [{
      image: "assets/image/Layer-6.svg",
      subHeader1: "No Workspace created or shared yet",
      subHeader2: "Create your first workspace here!"
    }],
  }]
  myWorkspace: any = [{
    name: "My Workspace",
    cardDivision: [{
      image: null,
      subHeader1: "Operations Management",
      subHeader2: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no"
    }, {
      image: null,
      subHeader1: "Human Resources",
      subHeader2: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no"
    },
      {
        image: null,
        subHeader1: "Supply Chain Management",
        subHeader2: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no"
      }]
  }]

  sharedWorkspace: any = [{
    name: "My Workspace",
    cardDivision: [{
      image: null,
      subHeader1: "Sales Department",
      subHeader2: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no"
    }, {
      image: null,
      subHeader1: "Cloud Computing",
      subHeader2: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no"
    }]
  }]

  goToDashboard() {
    this.router.navigate(['/launchpad']).then();
  }

  getWorkSpace() {
    this.workSpaceService.getAllWorkspace({}).then((res) => {
      this.workspaceRes = res;
    }).catch((e)=>{
      console.log(e)
    })
  }
}

