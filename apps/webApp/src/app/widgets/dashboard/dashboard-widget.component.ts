import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-dashboard-widget',
  templateUrl: './dashboard-widget.component.html',
  styleUrls: ['./dashboard-widget.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardWidgetComponent {
  details:any;
  frameType!: string;
  constructor() {
  }

  sidebar(details: any) {
    console.log(details);
    this.details = details;
  }

  getFrameType(isRightSidebarOpen: any) {
    console.log(isRightSidebarOpen)
    this.frameType = isRightSidebarOpen?'header-main-right-sidebar-frame':'header-main-menubar-frame';
  }
}
