import {Component, Input} from '@angular/core';

@Component({
  selector: 'cym-container-widget',
  templateUrl: './container-widget.component.html',
  styleUrls: ['./container-widget.component.scss']
})
export class ContainerWidgetComponent {
  data: any = "Accordion Data";
  cardData: any = "Card Data"
  fieldsetData: any = "Fieldset Data";
  fieldsetDataText: any = "Paragraph for Fieldset";
  panelHeaderData: any = "Panel Header";
  panelHeaderDataText: any = "Panel Text";
  dialogHeader: any = 'Dialog Header';
}
