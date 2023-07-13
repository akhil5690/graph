import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {GraphService} from "../../../../../../common/cym-services/graph/graph.service";
import {Router} from "@angular/router";
import {CymService} from "../../../../../../common/cym-services/systemService/cymSystemService";
import {MessageService} from "primeng/api";
import {EditorTools, ExplorerTools, RightTabForEditor, RightTabForExplorer} from "./dashboard-tools";

@Component({
  selector: 'cym-dashboard-widget',
  templateUrl: './dashboard-widget.component.html',
  styleUrls: ['./dashboard-widget.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService]
})
export class DashboardWidgetComponent implements OnInit {


  details: any;
  explorer: any;
  copyData: any;
  layout: any;
  schema: any;
  openFindingsPopup: boolean = false;
  findingsGraph: any;
  selectedFindings: any;
  tabType = 0;
  toolBarItems: any;
  rightTab: any;
  toolSelected: any;
  tabSelected: any;

  constructor(private systemService: CymService, private cdr: ChangeDetectorRef, private graphService: GraphService, private router: Router, private cym: CymService, private messageService: MessageService) {
  }


  ngOnInit() {
    this.getSchemaData()
  }

  getGraphData() {
    this.toolBarItems = ExplorerTools;
    this.rightTab = RightTabForExplorer;
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
    this.toolBarItems = ExplorerTools;
    this.rightTab = RightTabForExplorer;
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
    this.toolBarItems = ExplorerTools;
    this.rightTab = RightTabForExplorer;
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

  editor() {
    this.toolBarItems = EditorTools;
    this.rightTab = RightTabForEditor;
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

  private errorMessageConstructor(e: string) {
    this.messageService.add({severity: 'error', summary: 'Error', detail: e});

  }

  selectedTool(event: any) {
    this.systemService.setToolClick(event);
  }

  rightSidebarTabs(tab: string) {
    this.systemService.setRightSideTabClick(tab)
  }

  setActive(i: number) {
    return this.tabSelected === i ? 'active-class' : ''
  }
}
