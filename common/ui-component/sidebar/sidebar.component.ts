import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {sidebarItems} from './sidebar-items/sidebar'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class SidebarComponent implements OnInit {
  sidebarItems: any = sidebarItems;

  ngOnInit() {
  }


}
