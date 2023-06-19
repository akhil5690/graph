import {Component, Input, OnChanges} from '@angular/core';
@Component({
  selector: 'cym-input',
  templateUrl: './cym-input.component.html',
  styleUrls: ['./cym-input.component.scss']
})
export class CymInputComponent implements OnChanges{
  @Input() propertyMeta:any

  ngOnChanges(): void {
    console.log(this.propertyMeta.header)
  }
}
