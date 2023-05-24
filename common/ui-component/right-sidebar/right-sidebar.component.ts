import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {data} from "../graph/data";

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
  // @Input() data: any;
  data = data;
  @Input() filterOptions: any;
  @Output() isRightSidebarOpen = new EventEmitter();
  tab = 'details';
  properties: any;
  values: any;
  selectedProp: any;
  selectedVal: any;

  ngOnChanges(): void {
    this.selectedGraphItem()
  }

  ngOnInit() {
    this.properties = [
      {name: 'Account Id', code: 'AccountId'},
      {name: 'Label', code: 'label'},
      {name: 'Tag', code: 'tags'},
    ];
    // this.values =[
    //   { name: 'New York', code: 'NY' },
    //   { name: 'Rome', code: 'RM' },
    //   { name: 'London', code: 'LDN' },
    //   { name: 'Istanbul', code: 'IST' },
    //   { name: 'Paris', code: 'PRS' }
    // ];
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
    console.log(this.filterOptions)
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
    console.log(this.data)
    this.data?.nodes.forEach((data: any) => {
      // console.log(data[selectedProp['code']]);
      if (this.values.findIndex((value:any)=> value.name === data[selectedProp['code']]) === -1 && data[selectedProp['code']]) {
        this.values.push({name: data[selectedProp['code']]});
      }


    });
    console.log( this.values)
  }
}
