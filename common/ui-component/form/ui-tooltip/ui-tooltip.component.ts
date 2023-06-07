import {Component, Input} from '@angular/core';

@Component({
  selector: 'ui-tooltip',
  templateUrl: './ui-tooltip.component.html',
  styleUrls: ['./ui-tooltip.component.scss']
})
export class UiTooltipComponent {
  @Input() propertyMeta: any;

}
