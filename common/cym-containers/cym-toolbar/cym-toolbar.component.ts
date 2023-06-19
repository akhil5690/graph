import {Component, OnInit} from '@angular/core';
@Component({
  selector: 'cym-toolbar',
  templateUrl: './cym-toolbar.component.html',
  styleUrls: ['./cym-toolbar.component.scss']
})
export class CymToolbarComponent implements OnInit {
  items:any;

  ngOnInit() {
    this.items = [
      {
        label: 'Update',
        icon: 'pi pi-refresh'
      },
      {
        label: 'Delete',
        icon: 'pi pi-times'
      },
      {
        label: 'Angular',
        icon: 'pi pi-external-link',
        url: 'http://angular.io'
      },
      {
        label: 'Router',
        icon: 'pi pi-upload',
        routerLink: '/fileupload'
      }
    ];
  }
}
