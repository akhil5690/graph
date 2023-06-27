import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'cym-card',
  templateUrl: './cym-card.component.html',
  styleUrls: ['./cym-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CymCardComponent implements OnInit {
  @Input() cymClass!: string;
  @Input() cardData: any="";
  @Input() propertyHeader:any="";
  @Input() propertyFooter:any="";
  ngOnInit() {
  }
}
