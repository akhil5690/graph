import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignInComponent {
  theme: string = 'lightTheme';
  checked!: boolean;

  toggleTheme() {
    this.theme = this.theme === 'lightTheme' ? 'darkTheme' : 'lightTheme';
    this.checked = this.theme === 'darkTheme';
    document.body.className = this.theme;
  }
}
