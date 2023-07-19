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
    // get all data
    this.getWorkSpace({
      'org-id': '6',
      'user-id': '7'
    });
    this.getModel(null, {
      'org-id': '6',
      'user-id': '7'
    });
    this.getTask(null, {
      'org-id': '6',
      'user-id': '7'
    });
    this.getObservables(null, {
      'org-id': '6',
      'user-id': '7'
    });

    // get list of models of particular workspace
    this.getModel(null, {
      'org-id': '6',
      'user-id': '7',
    }, {'workspace': '4'});

    // by id
    this.getModel(2, {
      'org-id': '6',
      'user-id': '7',
    });
    this.getTask(2, {
      'org-id': '6',
      'user-id': '7',
    });

    this.getObservables(2, {
      'org-id': '6',
      'user-id': '7',
    });

    //   post
    this.postTask({
      'org-id': '6',
      'user-id': '7',
    },  {
      "id": 2,
      "status": null,
      "created_date": "2023-07-19T10:15:01.370981Z",
      "created_by": null,
      "last_updated_date": "2023-07-19T10:15:01.370988Z",
      "last_updated_by": null,
      "additional_info": null,
      "title": "Port 22",
      "description": "Block port for graph node",
      "start_date": "2023-07-18",
      "end_date": "2023-07-19",
      "assigned_to": "you",
      "org_id": 6
    },);
    this.postObservable({
      'org-id': '6',
      'user-id': '7',
    }, {
      "status": "",
      "created_date": "2023-07-19T09:53:02.504633Z",
      "created_by": "",
      "last_updated_date": "2023-07-19T09:53:02.504640Z",
      "last_updated_by": "",
      "additional_info": "",
      "type": "",
      "property": "",
      "value": "",
      "last_observed": "2023-07-19T09:53:02.504647Z",
      "org_id": 6
    },);
    this.postModel({
      'org-id': '6',
      'user-id': '7',
    }, {
      "status": "True",
      "created_date": "2023-07-19T08:24:52.748288Z",
      "created_by": "",
      "last_updated_date": "2023-07-19T08:24:52.748294Z",
      "last_updated_by": "",
      "additional_info": "",
      "name": "m",
      "description": "m",
      "schema": {
        "edges": [],
        "nodes": [
          {
            "id": "ac1044b4-6a5b-4d0a-bcbd-60818355c81e",
            "label": "AWS",
            "properties": [
              {
                "key": "Region",
                "type": "string",
                "default": "Virginia"
              },
              {
                "key": "keyspace",
                "type": "boolean",
                "default": "true"
              }
            ]
          }
        ]
      },
      "explorer": {},
      "org-id": 6,
      "workspace": 3
    });

  }

  goToDashboard() {
    this.router.navigate(['/launchpad']).then();
  }

  getWorkSpace(header: any) {
    this.workSpaceService.getWorkspace(header).then((res) => {
      this.workspaceRes = res;
    }).catch((e) => {
      console.log(e);
    })
  }

  private getModel(id: any, header: any, params?: any) {
    this.workSpaceService.getModel(id, header, params).then((model) => {
      console.log('model', model)
    }).catch((e) => {
      console.log(e);
    })
  }

  private getTask(id: any, header: any) {
    this.workSpaceService.getTask(id, header).then((task) => {
      console.log('task', task)
    }).catch((e) => {
      console.log(e);
    })
  }

  private getObservables(id: any, header: any) {
    this.workSpaceService.getObservables(id, header).then((observable) => {
      console.log('observable', observable)
    }).catch((e) => {
      console.log(e);
    })
  }

  private postTask(header: any, body: any) {
    this.workSpaceService.postTask(header, body).then((task) => {
      console.log('post Task', task);
    }).catch((e) => {
      console.log(e)
    });
  }

  private postObservable(header: any, body: any) {
    this.workSpaceService.postObservables(header, body).then((observables) => {
      console.log('post observables', observables);
    }).catch((e) => {
      console.log(e)
    });
  }

  private postModel(header: any, body: any) {
    this.workSpaceService.postModel(header, body).then((model) => {
      console.log('post model', model);
    }).catch((e) => {
      console.log(e)
    });
  }
}

