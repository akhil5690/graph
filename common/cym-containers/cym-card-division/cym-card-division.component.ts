import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'cym-card-division',
  templateUrl: './cym-card-division.component.html',
  styleUrls: ['./cym-card-division.component.scss']
})
export class CymCardDivisionComponent implements OnInit {
  @Input() cardDivision: any;
  @Input() cymClass: any;
  @Input() propertyHeader: any;
  @Input() routClick = false;
  @Input() cardDetails: any;
  @Output() cardClickEvent = new EventEmitter<any>;

  ngOnInit() {
  }

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

  cardClick(event: any) {
    this.cardClickEvent.emit(event)
  }
}
