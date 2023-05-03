import {Component, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../../../common/ui-services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignInComponent {
  signIn = new FormGroup({
    email: new FormControl('',Validators['required']),
    password: new FormControl('',Validators['required']),
  });

  constructor(private authservice:AuthService, private router:Router) {
  }

  setBackground(isDarkTheme:string) {
    document.body.className = isDarkTheme;
  }

  onSubmit() {
    if(this.authservice.login(this.signIn.valid)){
      document.body.className = '';
      this.router.navigate(['/launchpad']).then()
    }
  }
}
