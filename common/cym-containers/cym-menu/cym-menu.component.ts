import {Component, Input, OnInit} from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";

@Component({
  selector: 'cym-menu',
  templateUrl: './cym-menu.component.html',
  styleUrls: ['./cym-menu.component.scss'],
  providers: [MessageService]
})
export class CymMenuComponent implements OnInit{
  @Input() items!: MenuItem[];
  constructor(private messageService: MessageService) {}
  ngOnInit() {
    // this.items = [
    //   {
    //     label: 'Navigate',
    //     items: [
    //       {
    //         label: 'Angular',
    //         icon: 'pi pi-external-link',
    //         url: 'http://angular.io'
    //       },
    //       {
    //         label: 'Router',
    //         icon: 'pi pi-upload',
    //         routerLink: '/fileupload'
    //       }
    //     ]
    //   }
    // ];
  }

}
