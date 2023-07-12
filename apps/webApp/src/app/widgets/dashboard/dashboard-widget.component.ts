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
  explorer: any;
  copyData: any;
  layout: any;
  schema: any;
  openFindingsPopup: boolean = false;
  findingsGraph: any;
  selectedFindings: any;
  tabType = 0;
  toolBarItems: any;
  toolSelected: any;

  constructor(private systemService:CymService,private cdr: ChangeDetectorRef, private graphService: GraphService, private router: Router, private cym: CymService, private messageService: MessageService) {
  }


  ngOnInit() {
    this.getSchemaData()
  }

  getGraphData() {
    this.toolBarItems = [{
      toolName: 'toggle',
      icon: 'assets/image/overview.svg'
    },
      {
        toolName: 'zoomIn',
        icon: 'assets/image/zoomIn.svg'
      }, {
        toolName: 'zoomOut',
        icon: 'assets/image/zoomOut.svg'
      }, {
        toolName: 'fitContent',
        icon: 'assets/image/fit.svg'
      },
    ];
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
    this.toolBarItems = [{
      toolName: 'toggle',
      icon: 'assets/image/overview.svg'
    },
      {
        toolName: 'zoomIn',
        icon: 'assets/image/zoomIn.svg'
      }, {
        toolName: 'zoomOut',
        icon: 'assets/image/zoomOut.svg'
      }, {
        toolName: 'fitContent',
        icon: 'assets/image/fit.svg'
      },
    ];
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
    this.toolBarItems = [{
      toolName: 'save',
      icon: 'assets/image/save.svg',
      height: 20, width: 20

    }, {
      toolName: 'load',
      icon: 'assets/image/refresh.svg',
      height: 20, width: 20
    }, {
      toolName: 'zoomIn',
      icon: 'assets/image/zoomIn.svg',
      height: 20, width: 20
    }, {
      toolName: 'zoomOut',
      icon: 'assets/image/zoomOut.svg',
      height: 20, width: 20
    }, {
      toolName: 'undo',
      icon: 'assets/image/undo.svg',
      height: 15, width: 15
    }, {
      toolName: 'redo',
      icon: 'assets/image/redo.svg',
      height: 15, width: 15
    },
      {
        toolName: 'fit',
        icon: 'assets/image/fullscreen.svg',
        height: 15, width: 15
      }, {
        toolName: 'cut',
        icon: 'assets/image/cut.svg',
        height: 15, width: 15
      }, {
        toolName: 'copy',
        icon: 'assets/image/copy.svg',
        height: 15, width: 15
      }, {
        toolName: 'paste',
        icon: 'assets/image/paste.svg',
        height: 15, width: 15
      }, {
        toolName: 'delete',
        icon: 'assets/image/IconCancel.svg',
        height: 15, width: 15
      }

    ]

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
}
