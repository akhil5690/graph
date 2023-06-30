import { Component } from '@angular/core';

@Component({
  selector: 'cym-workspace-widget',
  templateUrl: './workspace-widget.component.html',
  styleUrls: ['./workspace-widget.component.scss']
})
export class WorkspaceWidgetComponent {
  workspace: any = [{
    name: "Workspace",
    cardDivision: [{
      image: null,
      subHeader1:"",
      subHeader2:""
    },
      {
        bgColor: "#07FF6A",
        cardLabel: "Manoj Desai",
        shortText: "MD",
        image: null
      },
      {
        bgColor: "#FF8B07",
        cardLabel: "Shwetha Karanth",
        shortText: "KB",
        image: null
      }]
  },
    {
      name: "Data management",
      subGroup: [{
        bgColor: "gray",
        cardLabel: "Modeling",
        image: "assets/image/data-modelling.svg"
      },
        {
          bgColor: "pink",
          cardLabel: "Load Data",
          image: "assets/image/data-transformation.svg"
        }],
    },
    {
      name: "Report",
      subGroup: [{
        bgColor: "red",
        cardLabel: "AWS Cymonix Infrastructure",
        image: "assets/image/data-modelling.svg",
        routPath: "/launchpad/dashboard"
      },
        {
          bgColor: "pink",
          cardLabel: "ARMS",
          image: "assets/image/data-modelling.svg"
        },
      ],
    }, {
      name: "Settings",
      subGroup: [{
        bgColor: "red",
        cardLabel: "Add User",
        image: "assets/image/add-user.svg",
        routPath: "/container"
      },
      ],
    }]
}
