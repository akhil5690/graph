import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-ui-panel',
  templateUrl: './ui-panel.component.html',
  styleUrls: ['./ui-panel.component.scss']
})
export class UiPanelComponent implements OnInit {
  @Input() panelHeaderData:any;
  @Input() panelHeaderDataText:any;

  ngOnInit() {
  }
}
