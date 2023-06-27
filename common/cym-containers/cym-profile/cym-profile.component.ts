import { Component } from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'cym-profile',
  templateUrl: './cym-profile.component.html',
  styleUrls: ['./cym-profile.component.scss']
})
export class CymProfileComponent {
  userProfile!: MenuItem[];
  ngOnInit() {
    this.userProfile = [
      {
        label: 'User Profile',
        items: [
          {
            label: 'Settings',
            icon: '',
            url: ''
          },
          {
            label: 'Sign-out',
            icon: '',
            routerLink: ''
          }
        ]
      }
    ];
  }
}
