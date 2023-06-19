import {Component, Input} from '@angular/core';

@Component({
  selector: 'cym-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() data: any;
}
