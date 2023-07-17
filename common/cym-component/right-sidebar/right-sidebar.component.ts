import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {GraphService} from "../../cym-services/graph/graph.service";
import {CymService} from "../../cym-services/systemService/cymSystemService";

@Component({
  selector: 'cym-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RightSidebarComponent implements OnChanges, OnInit {
  items: any;
  nodeData: any;
  openPopUp = false;
  @Output() edgeNodeProperty = new EventEmitter();

  @Input() data: any;
  @Input() type: any;
  // data = data;
  @Input() filterOptions: any;
  @Output() isRightSidebarOpen = new EventEmitter();
  @Output() filterGraph = new EventEmitter();
  @Output() selectedLayout = new EventEmitter();
  @Output() filterByFinding = new EventEmitter();
  tab = '';
  properties: any;
  values: any;
  selectedProp: any;
  selectedVal: any;
  suggestedList: any;
  layout: any;
  value: any;

  constructor(private graphservice: GraphService, private cymService: CymService) {
  }

  ngOnChanges(): void {
  }

  ngOnInit() {
    this.cymService.rightSideTabClick.subscribe((tab) => {
      this.tab = tab;
    });
    this.cymService.isRightSidebarOpenSub.subscribe((isOpen) => {
      this.isRightSidebarOpen.emit(isOpen);
      this.openPopUp = isOpen;
    });

    this.cymService.selectedGraphItem.subscribe((graphItem) => {
      if (graphItem) {
        this.items = [graphItem?.tag];
        this.openPopUp = true;
        this.tab = 'details';
        this.isRightSidebarOpen.emit(this.openPopUp);
      } else {
        this.items = null;
      }
    });

    // dropdown properties
    this.properties = [
      {name: 'Account Id', code: '~id'},
      {name: 'Label', code: 'label'},
      {name: 'Resource Type', code: 'resourceType'},
      {name: 'Tag', code: 'tags'},
    ];

  }


  getValue(selectedProp: any) {
    // on selecting property from autocomplete get the dropdown for value field
    // this.values = [];
    // this.data?.nodes.forEach((data: any) => {
    //   // if the filter already exist dont push to dropdown list, this.value
    //   if (this.values.findIndex((value: any) => value.name === data[selectedProp['code']]) === -1 && data[selectedProp['code']]) {
    //     this.values.push({name: data[selectedProp['code']]});
    //   }
    // });
  }

  search(event: { query: any; }, dataArray: any) {
    // get suggestion for autocomplete
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < dataArray.length; i++) {
      let country = dataArray[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.suggestedList = filtered;
  }

  getGraph() {
    const params = {
      filter: false,
      property: this.selectedProp.code,
      value: this.value
    };
    // send params to dashboard and get new graph on filter
    this.filterGraph.emit(params)
  }

  property($event: any) {
    this.edgeNodeProperty.emit($event)
  }
}
