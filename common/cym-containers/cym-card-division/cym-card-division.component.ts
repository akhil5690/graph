import {Component, Input} from '@angular/core';

@Component({
  selector: 'cym-card-division',
  templateUrl: './cym-card-division.component.html',
  styleUrls: ['./cym-card-division.component.scss']
})
export class CymCardDivisionComponent {
  @Input() cardDivision: any;
  @Input() cymClass: any;
  @Input() propertyHeader: any;
  @Input() cardData:any;
}
