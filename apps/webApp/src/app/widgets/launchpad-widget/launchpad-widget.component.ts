import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'cym-launchpad-widget',
  templateUrl: './launchpad-widget.component.html',
  styleUrls: ['./launchpad-widget.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LaunchpadWidgetComponent implements OnInit {
  cardMain: any;
  cardFooter = "";

  constructor(private router: Router) {
  }

  ngOnInit() {
    console.log(this.launchpad);

  }

  // launchpad container
  launchpad: any = [{
    name: "Workspace",
    subGroup: [{
      bgColor: "#FFED07",
      cardLabel: "Abhay Naveen",
      shortText: "AN",
      image: "",
    },
      {
        bgColor: "#07FF6A",
        cardLabel: "Manoj Desai",
        shortText: "MD",
        image: "",
      },
      {
        bgColor: "#FF8B07",
        cardLabel: "Shwetha Karanth",
        shortText: "KB",
        image: "",
      }]
  },
    {
      name: "Data management",
      subGroup: [{
        bgColor: "gray",
        cardLabel: "Modeling",
        image: "assets/image/data-modelling.svg",
      },
        {
          bgColor: "pink",
          cardLabel: "Load Data",
          image: "assets/image/data-transformation.svg",
        }],
    },
    {
      name: "Report",
      subGroup: [{
        bgColor: "red",
        cardLabel: "AWS Cymonix Infrastructure",
        image: "assets/image/data-modelling.svg",
        routPath: "/launchpad/dashboard",
        click: true,
      },
        {
          bgColor: "pink",
          cardLabel: "ARMS",
          image: "assets/image/data-modelling.svg",
        },
      ],
    }, {
      name: "Settings",
      subGroup: [{
        bgColor: "red",
        cardLabel: "Add User",
        image: "assets/image/add-user.svg",
      },
      ],
    }]

  showGraph() {
    this.router.navigate(['/launchpad/dashboard']).then()
  }
}
