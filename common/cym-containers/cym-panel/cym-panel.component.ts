import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'cym-panel',
  templateUrl: './cym-panel.component.html',
  styleUrls: ['./cym-panel.component.scss']
})
export class CymPanelComponent implements OnInit {
  @Input() panelHeaderData:any;
  @Input() panelHeaderDataText:any;

  ngOnInit() {
  }
}
