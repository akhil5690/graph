import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MenuItem} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'cym-breadcrumb',
  templateUrl: './cym-breadcrumb.component.html',
  styleUrls: ['./cym-breadcrumb.component.scss']
})
export class CymBreadcrumbComponent {
  // constructor(private router: Router) {
  // }

  @Input() cymClass: any;
  @Input() items!: MenuItem[];
  @Output() itemClickEvent = new EventEmitter<any>;
  home: MenuItem | undefined;

  ngOnInit() {
    // this.items = [{label: 'Workspace'},
    //   {label: 'Launchpad'}
    // ];
    // this.home = { icon: 'pi pi-home', routerLink: '/' };
  }
}
