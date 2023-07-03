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
    name: "Data management",
    subGroup: [{
      cardLabel: "Modeling",
      image: "assets/image/data-modelling.svg"
    },
      {
        cardLabel: "Load Data",
        image: "assets/image/data-transformation.svg"
      },
      {
        cardLabel: "Data Catalog",
        image: "assets/image/Data Catalog.svg"
      }, {
        cardLabel: "Data Sources",
        image: "assets/image/Data Sources.svg"
      }, {
        cardLabel: "Data Pipelines",
        image: "assets/image/Data Pipelines.svg"
      }, {
        cardLabel: "Queries",
        image: "assets/image/Queries.svg"
      }],
  },
    {
      name: "Report",
      subGroup: [{
        cardLabel: "Cymonix IQ Infrastructure",
        image: "assets/image/data-modelling.svg",
        routPath: "/launchpad/dashboard"
      },
        {
          cardLabel: "UAG Armis",
          image: "assets/image/data-modelling.svg"
        },
      ],
    },
    {
      name: "BOTs",
      description: "There are no BOTs configured or running"
    }, {
      name: "Settings",
      subGroup: [{
        cardLabel: "Add User",
        image: "assets/image/add-user.svg",
        routPath: "/container"
      },
        {
          cardLabel: "Organisation Settings",
          image: "assets/image/Organisation Settings.svg",
        },
        {
          cardLabel: "Account Management",
          image: "assets/image/Account Management.svg",
        }
      ],
    }]

  showGraph(event: any) {
    this.router.navigate([event]).then()
  }
}
