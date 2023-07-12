import {Component, Input, ViewEncapsulation} from '@angular/core';
import {toolbar} from "../../cym-component/frames/toolbar.json";
import {secondaryToolbar} from "./secondary-toolbar.json";
import {Router} from "@angular/router";

@Component({
  selector: 'cym-secondary-toolbar',
  templateUrl: './cym-secondary-toolbar.component.html',
  styleUrls: ['./cym-secondary-toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CymSecondaryToolbarComponent {

  @Input() CymSecondaryToolbar!:string;

  constructor(private router: Router) {
  }

  secondaryItems: any = secondaryToolbar;
  sector1: any;
  sector2: any;
  sector3: any;
  sector4: any;
  breadcrumbItems: any;

  ngOnInit() {
    this.breadcrumbItems = [{label: 'Workspace', routerLink: '/workspace'},
      {label: 'Launchpad',routerLink: '/launchpad'}
    ];

    // ,routerLink: this.router.navigate(['launchpad'])
    // ,routerLink: this.router.navigate(['workspace'])
    this.sector1 = this.secondaryItems.filter((toolbar: any) => {
      return toolbar.sector === "1" && toolbar.position === "top";
    });
    this.sector2 = this.secondaryItems.filter((toolbar: any) => {
      return toolbar.sector === "2" && toolbar.position === "top";
    });
    this.sector3 = this.secondaryItems.filter((toolbar: any) => {
      return toolbar.sector === "3" && toolbar.position === "top";
    });
    this.sector4 = this.secondaryItems.filter((toolbar: any) => {
      return toolbar.sector === "4" && toolbar.position === "top";
    });
  }
}
