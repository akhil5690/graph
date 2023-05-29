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
}
