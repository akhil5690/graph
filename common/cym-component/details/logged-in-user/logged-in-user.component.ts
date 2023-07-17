import {Component, Input} from '@angular/core';

@Component({
  selector: 'cym-logged-in-user',
  templateUrl: './logged-in-user.component.html',
  styleUrls: ['./logged-in-user.component.scss']
})
export class LoggedInUserComponent {

  @Input () text= "SK" ;

}
