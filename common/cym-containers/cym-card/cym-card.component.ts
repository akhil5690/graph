import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'cym-card',
  templateUrl: './cym-card.component.html',
  styleUrls: ['./cym-card.component.scss']
})
export class CymCardComponent implements OnInit {
  @Input() cardData: any;

  ngOnInit() {
  }
}
