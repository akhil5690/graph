import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {GraphService} from "../../../../../../common/cym-services/graph/graph.service";
import {Router} from "@angular/router";
import {CymService} from "../../../../../../common/cym-services/systemService/cymSystemService";
import {MessageService} from "primeng/api";

@Component({
  selector: 'cym-dashboard-widget',
  templateUrl: './dashboard-widget.component.html',
  styleUrls: ['./dashboard-widget.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService]
})
export class DashboardWidgetComponent implements OnInit {


  details: any;
  frameType!: string;
  explorer: any;
  filterOptions: any;
  copyData: any;
  layout: any;
  schema: any;
  openFindingsPopup: boolean = false;
  findingsGraph: any;
  selectedFindings: any;
  constructor(private cdr: ChangeDetectorRef, private graphService: GraphService, private router: Router, private cym: CymService, private messageService: MessageService) {
  }



  ngOnInit() {
    this.getSchemaData()
  }

  getGraphData() {
    this.cym.setLoader(true);
    this.graphService.getGraphData({
      "filter": false,
      "property": "~id",
      "value": "806000659309"
    }).then((data) => {
      this.explorer = data;
      this.copyData = data;// for creating the filter
    }).catch(e => {
      console.log(e);
      this.errorMessageConstructor('err')
    }).finally(() => {
      this.cym.setLoader(false);
    })
  }

  refreshGraph(params: any) {
    // on filtering get new graph data
    this.explorer = null;
    this.cym.setLoader(true);
    this.graphService.getGraphData(params).then((data) => {
      this.explorer = data;
    }).catch(e => {
      console.log(e);
      this.errorMessageConstructor('err')
    }).finally(() => {
      this.cym.setLoader(false);
    })
  }

  getSchemaData() {
    // this.cym.setLoader(true);
    this.graphService.getSchemaData({filter: false}).then((data) => {
      this.schema = data;
      this.copyData = data;// for creating the filter
    }).catch(e => {
      console.log(e);
      this.errorMessageConstructor('err');
    }).finally(() => {
      this.cym.setLoader(false);

    })
  }

  loadFindings(findings: any) {
    this.selectedFindings = findings;
    // for opening findings pop up and show graph
    if (findings) {
      this.openFindingsPopup = true;
      this.cym.setLoader(true);
      this.graphService.getGraphData({
        filter: false,
        property: '~id',
        value: findings.id,
        getFindings: true
      }).then((data) => {
        this.findingsGraph = data;
      }).catch(e => console.log(e)).finally(() => {
        this.cym.setLoader(false);
      })
    }
  }

  private errorMessageConstructor(e:string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: e});

  }
}
