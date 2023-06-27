import {Component, OnInit, ViewEncapsulation} from '@angular/core';
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
  launchpad = [{
    name: "Workspace",
    subGroup: [{
      bgColor: "red",
      cardLabel: "Abhay Naveen",
      shortText: "AN",
      image: "",
    },
      {
        bgColor: "pink",
        cardLabel: "Manoj Desai",
        shortText: "MD",
        image: "",
      },
      {
        bgColor: "blue",
        cardLabel: "Shwetha Karanth",
        shortText: "KB",
        image: "",
      },
      {
        bgColor: "green",
        cardLabel: "Name",
        shortText: "BH",
        image: "",
      }],
  },
    {
      name: "Data management",
      subGroup: [{
        bgColor: "gray",
        cardLabel: "Modeling",
        image: "cymonix/fusioncenterui/apps/webApp/src/assets/image/data-modelling.svg",
      },
        {
          bgColor: "pink",
          cardLabel: "Load Data",
          image:"../../apps/webApp/src/assets/image/data-transformation.svg",
        }],
    },
    {
      name: "Report",
      subGroup: [{
        bgColor: "red",
        cardLabel: "AWS Cymonix Infrastructure",
        image: "./../apps/webApp/src/assets/image/data-modelling.svg",
      },
        {
          bgColor: "pink",
          cardLabel: "ARMS",
          image: "./../apps/webApp/src/assets/image/data-modelling.svg",
        },
        {
          bgColor: "blue",
          cardLabel: "Name",
          image: "./../apps/webApp/src/assets/image/data-modelling.svg",
        },
        {
          bgColor: "green",
          cardLabel: "Name",
          image: "./../apps/webApp/src/assets/image/data-modelling.svg",
        }],
    }, {
      name: "Settings",
      subGroup: [{
        bgColor: "red",
        cardLabel: "Add User",
        image: "../../apps/webApp/src/assets/image/add-user.svg",
      },
      ],
    }]

  showGraph() {
    this.router.navigate(['/launchpad/dashboard']).then()
  }
}
