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
  @Input() cardData: any;
  @Input() cardHeader: any;
  @Input() cardContent: any;
  @Input() cardFooter: any;
  @Input() routClick = false;
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

  cardClick() {
    if (this.routClick) {
      this.cardClickEvent.emit(this.routClick)

    }

  }
}
