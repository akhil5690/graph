import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() {
  }

  setTheme(variable: any, color: any) {
    document.documentElement.style.setProperty(`${variable}`,color)
  }
}
