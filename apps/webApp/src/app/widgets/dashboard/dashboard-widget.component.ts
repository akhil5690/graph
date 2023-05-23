import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {GraphService} from "../../../../../../common/ui-services/graph/graph.service";

@Component({
  selector: 'app-dashboard-widget',
  templateUrl: './dashboard-widget.component.html',
  styleUrls: ['./dashboard-widget.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardWidgetComponent implements OnInit{
  details: any;
  frameType!: string;
  data: any;

  constructor(private cdr: ChangeDetectorRef,private graphService: GraphService) {
  }

  ngOnInit() {
    this.getGraphData();
    this.getOptions();
  }
  private getGraphData() {
    this.graphService.getGraphData().then((data) => {
      this.data = data;
    }).catch(e => console.log(e))
  }
  sidebar(details: any) {
    console.log(details);
    this.details = details;
  }

  getFrameType(isRightSidebarOpen: any) {
    this.frameType = !isRightSidebarOpen ? 'header-main-menubar-frame' : 'header-main-right-sidebar-frame';
    this.cdr.detectChanges();
  }

  private getOptions() {
    this.graphService.getOption().then((data)=>{
      console.log(data)
    }).catch(e=>{
      console.log(e)
    })
  }
}
