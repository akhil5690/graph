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
  breadcrumbItems: any;
  tabSelected: any;
  isRightSidebarOpen: any;

  constructor(private systemService: CymService, private cdr: ChangeDetectorRef, private graphService: GraphService, private router: Router, private cym: CymService, private messageService: MessageService) {
  }


  ngOnInit() {
    this.systemService.selectedGraphItem.subscribe((item) => {
      if (item) {
        this.toggleRightSidebar(false);
        this.rightSidebarTabs('details')
      }
    });
    this.getSchemaData();
    this.breadcrumbItems = [{label: 'Workspace', routerLink: '/workspace'},
      {label: 'Launchpad', routerLink: '/launchpad'},
      {label: 'Dashboard', routerLink: '/launchpad/dashboard'}];
  }

  getGraphData() {
    this.toolBarItems = ExplorerTools;
    this.rightTab = RightTabForExplorer;
    this.resetRightSidebar();
    this.systemService.setGraphItem(null);
    this.cym.setLoader(true);
    this.graphService.getGraphData({
      "filter": false,
      "property": "~id",
      "value": "746454863131"
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
    this.resetRightSidebar();
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
    this.resetRightSidebar();
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
    this.resetRightSidebar();
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

  rightSidebarTabs(tab: any) {
    this.systemService.setRightSideTabClick(tab);
    this.tabSelected = tab;
  }

  setActive(tab: string) {
    return this.tabSelected === tab ? 'active-class' : '';
  }

  toggleRightSidebar(isRightSidebarOpen: any) {
    this.isRightSidebarOpen = !isRightSidebarOpen;
    this.systemService.setRightSideToolbarOpen(this.isRightSidebarOpen);
    this.setDefault(isRightSidebarOpen);
  }

  setDefault(isRightSidebarOpen: any){
    if (isRightSidebarOpen) {
      if ((this.tabType === 0 || this.tabType === 1)) {
        this.systemService.setRightSideTabClick('details')
      } else {
        this.systemService.setRightSideTabClick('edit')
      }
    }
  }

  private resetRightSidebar() {
    this.systemService.setGraphItem(null);
    this.toggleRightSidebar(true);
  }
}
