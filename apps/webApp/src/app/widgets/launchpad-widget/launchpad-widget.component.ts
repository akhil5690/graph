import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {exitCodeFromResult} from "@angular/compiler-cli";

@Component({
  selector: 'cym-launchpad-widget',
  templateUrl: './launchpad-widget.component.html',
  styleUrls: ['./launchpad-widget.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LaunchpadWidgetComponent implements OnInit {
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
      image: null
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

  showGraph(event: any) {
    this.router.navigate([event]).then()
  }
}
