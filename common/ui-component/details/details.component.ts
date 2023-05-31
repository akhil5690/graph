import {Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class DetailsComponent {
  @Input() data: any;
  headers = ['label','value']

  severity(item: any, header: string) {
    return header === 'value' && item['label']==='severity';
  }

  getStyleForSeverity(item: any, header: string) {
    if(this.severity(item,header)){
      switch (item['value']){
        case 'CRITICAL': return {backgroundColor:'red'};
      }
    }
    return ;
  }
}
