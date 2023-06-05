import {Component, Input, OnChanges} from '@angular/core';
@Component({
  selector: 'ui-input',
  templateUrl: './ui-input.component.html',
  styleUrls: ['./ui-input.component.scss']
})
export class UiInputComponent implements OnChanges{
  @Input() propertyMeta:any

  ngOnChanges(): void {
    console.log(this.propertyMeta.header)
  }
}
