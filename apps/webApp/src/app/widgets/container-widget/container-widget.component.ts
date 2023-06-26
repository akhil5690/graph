import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'cym-container-widget',
  templateUrl: './container-widget.component.html',
  styleUrls: ['./container-widget.component.scss']
})
export class ContainerWidgetComponent implements OnInit{
  data: any = "Accordion Data";
  cardData: any = "Card Data"
  fieldsetData: any = "Fieldset Data";
  fieldsetDataText: any = "Paragraph for Fieldset";
  panelHeaderData: any = "Panel Header";
  panelHeaderDataText: any = "Panel Text";
  dialogHeader: any = 'Dialog Header';
  toastPosition:any='top-center';
  sideBarPosition:any='Left'
  cities:any;

  ngOnInit() {
    this.cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
    ];
  }
  // showSuccess() {
  //   console.log('add');
  // }
}
