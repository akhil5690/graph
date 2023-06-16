import {Component, Input, OnInit,} from '@angular/core';

@Component({
  selector: 'app-ui-accordion',
  templateUrl: './ui-accordion.component.html',
  styleUrls: ['./ui-accordion.component.scss']
})
export class UiAccordionComponent implements OnInit {
  @Input() data: any;

  ngOnInit() {
  }
}
