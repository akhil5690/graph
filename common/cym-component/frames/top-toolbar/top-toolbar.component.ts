import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {toolbar} from "../toolbar.json";

@Component({
  selector: 'cym-top-toolbar',
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TopToolbarComponent implements OnInit {
  toolbarItem: any = toolbar;
  sector1: any;
  sector2: any;
  sector3: any;
  sector4: any;

  ngOnInit() {
    this.sector1 = this.toolbarItem.filter((toolbar: any) => {
      return toolbar.sector === "1" && toolbar.position === "top";
    });
    this.sector2 = this.toolbarItem.filter((toolbar: any) => {
      return toolbar.sector === "2" && toolbar.position === "top";
    });
    this.sector3 = this.toolbarItem.filter((toolbar: any) => {
      return toolbar.sector === "3" && toolbar.position === "top";
    });
    this.sector4 = this.toolbarItem.filter((toolbar: any) => {
      return toolbar.sector === "4" && toolbar.position === "top";
    });
  }
}
