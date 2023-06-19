import {Component, Input, OnInit,} from '@angular/core';

@Component({
  selector: 'cym-accordion',
  templateUrl: './cym-accordion.component.html',
  styleUrls: ['./cym-accordion.component.scss']
})
export class CymAccordionComponent implements OnInit {
  @Input() data: any;

  ngOnInit() {
  }
}
