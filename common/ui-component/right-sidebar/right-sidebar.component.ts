import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {data} from "../graph/data";
import {GraphService} from "../../ui-services/graph/graph.service";

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RightSidebarComponent implements OnChanges, OnInit {
  items: any;
  nodeData: any;
  openPopUp = false;

  @Input() details: any;
  @Input() data: any;
  // data = data;
  @Input() filterOptions: any;
  @Output() isRightSidebarOpen = new EventEmitter();
  @Output() filterGraph = new EventEmitter();
  @Output() selectedLayout = new EventEmitter();
  tab = 'details';
  properties: any;
  values: any;
  selectedProp: any;
  selectedVal: any;
  suggestedList: any;
  layout: any;
  selectedLayoutOpt: any;

  constructor(private graphservice:GraphService) {
  }

  ngOnChanges(): void {
    this.selectedGraphItem()
  }

  ngOnInit() {
    this.properties = [
      {name: 'Account Id', code: 'AccountId'},
      {name: 'Label', code: 'label'},
      {name: 'Resource Type', code: 'resourceType'},
      {name: 'Tag', code: 'tags'},
    ];

    this.layout = [
      {name: 'Organic', code: 'Organic'},
      {name: 'Hierarchy', code: 'Hierarchy'},
      {name: 'Orthogonal', code: 'Orthogonal'},
      {name: 'Circular', code: 'Circular'},
      {name: 'Radial', code: 'Radial'},
    ];
  }

  open(isOpen: boolean) {
    this.openPopUp = isOpen && this.details;
    this.isRightSidebarOpen.emit(this.openPopUp);
  }

  tabs(tab: string) {
    this.openPopUp = true;
    this.tab = tab;
    this.isRightSidebarOpen.emit(this.openPopUp);
    if (tab === 'details' && !this.nodeData) {
      this.openPopUp = false;
      this.isRightSidebarOpen.emit(this.openPopUp);
    }
  }

  private selectedGraphItem() {
    if (this.details) {
      this.items = [this.details.tag];
      this.nodeData = this.items.flatMap((item: any) =>
        Object.entries(item).map(([label, value]) => ({label, value}))
      );
      this.openPopUp = true;
    }
    this.isRightSidebarOpen.emit(this.openPopUp);
  }

  getProps(selectedProp: any) {
    this.values = [];
    this.data?.nodes.forEach((data: any) => {
      if (this.values.findIndex((value:any)=> value.name === data[selectedProp['code']]) === -1 && data[selectedProp['code']]) {
        this.values.push({name: data[selectedProp['code']]});
      }
    });
  }

  search(event: { query: any; }, dataArray:any) {
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
      filter:true,
      property:this.selectedProp.code,
      value:this.selectedVal.name
    }

    this.filterGraph.emit(params)
  }

  layoutChange(selectedLayout: any) {
    this.selectedLayout.emit(selectedLayout.name)
  }
}
