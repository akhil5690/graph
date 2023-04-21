import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn!:boolean;
  constructor() { }

  login(isFormValid:boolean){
    this.isLoggedIn = isFormValid;
    return this.isLoggedIn;
  }
}
