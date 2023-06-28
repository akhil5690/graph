import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {exitCodeFromResult} from "@angular/compiler-cli";
import {CymService} from "../../../../../../common/cym-services/systemService/cymSystemService";

@Component({
  selector: 'cym-launchpad-widget',
  templateUrl: './launchpad-widget.component.html',
  styleUrls: ['./launchpad-widget.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LaunchpadWidgetComponent implements OnInit {
  constructor(private router: Router, private cym: CymService) {
  }

  ngOnInit() {
    this.cym.setLoader(true);
    setTimeout(() => {
      this.cym.setLoader(false)
    }, 1000);
  }

  // launchpad container
  launchpad: any = [{
    name: "Workspace",
    subGroup: [{
      bgColor: "#FFED07",
      cardLabel: "Abhay Naveen",
      shortText: "AN",
      image: "",
      routPath: "",
    },
      {
        bgColor: "#07FF6A",
        cardLabel: "Manoj Desai",
        shortText: "MD",
        image: "",
        routPath: "",
      },
      {
        bgColor: "#FF8B07",
        cardLabel: "Shwetha Karanth",
        shortText: "KB",
        image: "",
        routPath: "",
      }]
  },
    {
      name: "Data management",
      subGroup: [{
        bgColor: "gray",
        cardLabel: "Modeling",
        image: "assets/image/data-modelling.svg",
        routPath: "",
      },
        {
          bgColor: "pink",
          cardLabel: "Load Data",
          image: "assets/image/data-transformation.svg",
          routPath: "",
        }],
    },
    {
      name: "Report",
      subGroup: [{
        bgColor: "red",
        cardLabel: "AWS Cymonix Infrastructure",
        image: "assets/image/data-modelling.svg",
        routPath: "/launchpad/dashboard",
      },
        {
          bgColor: "pink",
          cardLabel: "ARMS",
          image: "assets/image/data-modelling.svg",
          routPath: "",
        },
      ],
    }, {
      name: "Settings",
      subGroup: [{
        bgColor: "red",
        cardLabel: "Add User",
        image: "assets/image/add-user.svg",
        routPath: "/container",
      },
      ],
    }]

  showGraph(event: any) {
    for (let i = 0; i < this.launchpad.length; i++) {
      var arrayMain = this.launchpad[i];
      for (let j = 0; j < arrayMain.subGroup.length; j++) {
        var arraySub = arrayMain.subGroup[j];
        if (event === arraySub.cardLabel) {
          this.router.navigate([arraySub.routPath]).then()
          break;
        }
      }
    }
  }
}
