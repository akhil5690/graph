import {Component, Input} from '@angular/core';

@Component({
  selector: 'cym-tooltip',
  templateUrl: './cym-tooltip.component.html',
  styleUrls: ['./cym-tooltip.component.scss']
})
export class CymTooltipComponent {
  @Input() propertyMeta: any;

}
