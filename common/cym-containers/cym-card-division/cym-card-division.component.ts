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
  @Input() cardData: any;
  @Input() cardHeader: any;
  @Input() cardContent: any;
  @Input() cardFooter: any;

  getAbbrevation(value: string) {
    if (value) {
      let result = value.replace(/(\w)\w*\W*/g, function (_, i) {
          return i.toUpperCase();
        }
      )
      return result;
    }

    return '';
  }
}
