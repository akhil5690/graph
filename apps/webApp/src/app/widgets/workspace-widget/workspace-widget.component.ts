import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {workSpaceService} from "../../../../../../common/cym-services/workspace/workspace.service";
import {CymService} from "../../../../../../common/cym-services/systemService/cymSystemService";
import {apiOrg} from "../../../../../../constants/app-constants";

@Component({
  selector: 'cym-workspace-widget',
  templateUrl: './workspace-widget.component.html',
  styleUrls: ['./workspace-widget.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WorkspaceWidgetComponent implements OnInit {
  workspaceRes: any;
  tasks: any;
  shareData: any;
  observables: any;
  noWorkspace = {
    image: "assets/image/Layer-6.svg",
    subHeader1: "No Workspace created or shared yet",
    subHeader2: "Create your first workspace here!"
  };
  noObservables ={
    image: "assets/image/find_workspace.svg",
    subHeader2: "No new Observables"
  };

  noTasks={
    image: "assets/image/clipboard_workspace.svg",
    subHeader2: "You don't have any new tasks"
  };
  noShare = {
    image: "assets/image/folder_workspace.svg",
    subHeader2: "No files shared with you yet"
  };

  constructor(private router: Router, private workSpaceService: workSpaceService) {
  }

  ngOnInit() {
    this.apis();

  }

  apis() {
    this.getReq();
  }

  goToDashboard() {
    this.router.navigate(['/launchpad']).then();
  }

  private getReq() {
    // get all data
    this.getWorkSpace(apiOrg);
    this.getModel(null, apiOrg);
    this.getTask(null, apiOrg);
    this.getObservables(null, apiOrg);

    // get list of models of particular workspace
    this.getModel(null, apiOrg, {'workspace': '4'});

    // by id
    this.getModel(2, apiOrg);
    this.getTask(2, apiOrg);

    this.getObservables(2, apiOrg);
  }

  private postReq() {
    //   post
    this.postWorkspace(apiOrg, {
      "status": "True",
      "created_date": "2023-07-19T11:16:51.295364Z",
      "created_by": "",
      "last_updated_date": "2023-07-19T11:16:51.295427Z",
      "last_updated_by": "",
      "additional_info": "",
      "name": "Operations Management",
      "description": 'Administration of business operations ',
      "color": "orange",
      "workspace_key": 'OM',
      "org_id": 6,
      "user": 7
    });
    this.postTask(apiOrg, {
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
    this.postObservable(apiOrg, {
      "status": "",
      "created_date": "2023-07-19T09:53:02.504633Z",
      "created_by": "",
      "last_updated_date": "2023-07-19T09:53:02.504640Z",
      "last_updated_by": "",
      "additional_info": "",
      "type": "",
      "property": "load-data-from-crm-cymonix",
      "value": "has failed",
      "last_observed": "2023-07-19T09:53:02.504647Z",
      "org_id": 6
    },);
    this.postModel(apiOrg, {
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

  private deleteReq() {
    this.deleteModel(null, apiOrg);
    this.deleteTask(null, apiOrg);
    this.deleteObservables(null, apiOrg);
    this.deleteWorkspace(null, apiOrg);
  }

  private deletebyId() {
    this.deleteWorkspace(246, apiOrg);
    this.deleteModel(23, apiOrg);
    this.deleteTask(13, apiOrg);
    this.deleteObservables(10, apiOrg);
  }

  getWorkSpace(header: any) {
    this.workSpaceService.getWorkspace(header).then((res) => {
      this.workspaceRes = res;
      console.log(this.workspaceRes, "workspaceRes")
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
      this.tasks = task;
      console.log('task', this.tasks)
    }).catch((e) => {
      console.log(e);
    })
  }

  private getObservables(id: any, header: any) {
    this.workSpaceService.getObservables(id, header).then((observable) => {
      this.observables = observable;
      console.log('observable', this.observables)
    }).catch((e) => {
      console.log(e);
    })
  }

  private postWorkspace(header: any, body: any) {
    this.workSpaceService.postWorkspace(header, body).then((workspace) => {
      console.log('post Workspace', workspace);
    }).catch((e) => {
      console.log(e)
    });
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

  private deleteModel(id: any, headers: any) {
    this.workSpaceService.deleteModels(id, headers).then((model) => {
      console.log('deleted');
    }).catch((e) => {
      console.log(e)
    })
  }

  private deleteTask(id: any, headers: any) {
    this.workSpaceService.deleteTask(id, headers).then((task) => {
      console.log('deleted');
    }).catch((e) => {
      console.log(e)
    })
  }

  private deleteObservables(id: any, headers: any) {
    this.workSpaceService.deleteObservables(id, headers).then((observables) => {
      console.log('deleted');
    }).catch((e) => {
      console.log(e)
    })
  }

  private deleteWorkspace(id: any, headers: any) {
    this.workSpaceService.deleteWorkspace(id, headers).then((observables) => {
      console.log('deleted');
    }).catch((e) => {
      console.log(e)
    })
  }

  private putReq() {
    this.putWorkspace(48, {
      'org-id': '6',
      'user-id': '7',
    }, {
      "status": "False",
      "created_date": "2023-07-19T11:16:51.295364Z",
      "created_by": "",
      "last_updated_date": "2023-07-19T11:16:51.295427Z",
      "last_updated_by": "",
      "additional_info": "",
      "name": "Vandana",
      "description": "m",
      "color": "orange",
      "workspace_key": null, "org_id": 6,
      "user": 7
    });
  }

  private putWorkspace(id: any, headers: {}, body: any) {
    this.workSpaceService.putWorkspace(id, headers, body).then().catch((e) => {
      console.log(e)
    })
  }
}

