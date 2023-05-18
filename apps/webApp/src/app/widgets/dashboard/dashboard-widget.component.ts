import {ChangeDetectorRef, Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-dashboard-widget',
  templateUrl: './dashboard-widget.component.html',
  styleUrls: ['./dashboard-widget.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardWidgetComponent {
  details: any;
  frameType!: string;

  constructor(private cdr: ChangeDetectorRef) {
  }

  sidebar(details: any) {
    console.log(details);
    this.details = details;
  }

  getFrameType(isRightSidebarOpen: any) {
    this.frameType = !isRightSidebarOpen ? 'header-main-menubar-frame' : 'header-main-right-sidebar-frame';
    this.cdr.detectChanges();
  }
}
