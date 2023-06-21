import {Component, Input} from '@angular/core';

@Component({
  selector: 'cym-tooltip',
  templateUrl: './cym-tooltip.component.html',
})
export class CymTooltipComponent {
  @Input() propertyMeta: any;

}
