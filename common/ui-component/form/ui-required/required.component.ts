import {Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'ui-required',
  templateUrl: './required.component.html',
  styleUrls: ['./required.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RequiredComponent {
  @Input() propertyMeta: any;
}
