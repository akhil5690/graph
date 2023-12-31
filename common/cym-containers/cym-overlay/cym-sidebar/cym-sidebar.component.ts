import {Component, Input} from '@angular/core';

@Component({
  selector: 'cym-sidebars',
  templateUrl: './cym-sidebar.component.html',
  styleUrls: ['./cym-sidebar.component.scss']
})
export class CymSidebarComponent {
  @Input() sideBarPosition:any ='';
  sidebarVisible1: boolean = false;

  sidebarVisible2: boolean = false;

  sidebarVisible3: boolean = false;

  sidebarVisible4: boolean = false;
}
