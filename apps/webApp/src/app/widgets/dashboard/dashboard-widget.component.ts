import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {GraphService} from "../../../../../../common/ui-services/graph/graph.service";

@Component({
  selector: 'app-dashboard-widget',
  templateUrl: './dashboard-widget.component.html',
  styleUrls: ['./dashboard-widget.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardWidgetComponent implements OnInit {
  details: any;
  frameType!: string;
  data: any;
  filterOptions: any;
  copyData: any;
  layout: any;
  schema: any;

  constructor(private cdr: ChangeDetectorRef, private graphService: GraphService) {
  }

  ngOnInit() {
    this.getGraphData();
    this.getSchemaData();
  }

  private getGraphData() {
    this.graphService.getGraphData({filter: false}).then((data) => {
      this.data = data;
      this.copyData = data;// for creating the filter
    }).catch(e => console.log(e))
  }

  getFrameType(isRightSidebarOpen: any) {
    this.frameType = !isRightSidebarOpen ? 'header-main-menubar-frame' : 'header-main-right-sidebar-frame';
    this.cdr.detectChanges();
  }

  refreshGraph(params: any) {
    // on filtering get new graph data
    this.data = null;
    this.graphService.getGraphData(params).then((data) => {
      this.data = data;
      console.log(this.data)
    }).catch(e => console.log(e))
  }

  sendLayout(layout:any) {
    // on selecting dropdown send layout that you selected to graph component
    this.layout = layout
  }

  getFindings(params: any) {
    this.data = null;
    this.graphService.getGraphData(params).then((data: any) => {
      this.data = data;
      console.log(this.data)
    }).catch(e => console.log(e))
  }

  private getSchemaData() {
    this.graphService.getSchemaData({filter: false}).then((data) => {
      this.schema = data;
      this.copyData = data;// for creating the filter
    }).catch(e => console.log(e))
  }
}
