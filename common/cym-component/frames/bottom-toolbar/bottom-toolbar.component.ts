import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {toolbar} from "../toolbar.json";

@Component({
  selector: 'cym-bottom-toolbar',
  templateUrl: './bottom-toolbar.component.html',
  styleUrls: ['./bottom-toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BottomToolbarComponent implements OnInit {
  toolbarItem: any = toolbar;
  sector1: any;
  sector2: any;
  ngOnInit() {
    this.sector1 = this.toolbarItem.filter((toolbar: any) => {
      return toolbar.sector === "1" && toolbar.position === "bottom";
    });
    this.sector2 = this.toolbarItem.filter((toolbar: any) => {
      return toolbar.sector === "2" && toolbar.position === "bottom";
    });
  }
}
