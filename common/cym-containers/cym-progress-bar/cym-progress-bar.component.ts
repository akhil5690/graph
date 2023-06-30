import {Component, Input} from '@angular/core';
import {MessageService} from "primeng/api";

@Component({
  selector: 'cym-progress-bar',
  templateUrl: './cym-progress-bar.component.html',
  styleUrls: ['./cym-progress-bar.component.scss'],
  providers: [MessageService]
})
export class CymProgressBarComponent {
  @Input() cymClass: any;
}
