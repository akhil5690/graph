import {Component} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'ui-input',
  templateUrl: './ui-input.component.html',
  styleUrls: ['./ui-input.component.scss']
})
export class UiInputComponent {
  formGroup!:FormGroup;
}
