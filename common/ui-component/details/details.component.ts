import {Component, Input, OnChanges, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetailsComponent implements OnChanges {
  @Input() data: any;
  headers: any
  ngOnChanges(): void {
    console.log(this.data[0])
    this.headers = Object.keys(this.data[0]);
  }

  isSeverity(header: string) {
    return header === 'severity';
  }

  getStyleForSeverity(item: any, header: string) {
    if (this.isSeverity(header)) {
      return {backgroundColor: this.data[0].vertex_color};
    }
    return;
  }


}
