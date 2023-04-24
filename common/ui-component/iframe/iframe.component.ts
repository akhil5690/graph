import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {Router} from "@angular/router";

@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss']
})
export class IframeComponent implements OnInit{
  @Input() url!: string;
  safeSrc!: SafeResourceUrl;
  constructor(private router: Router,private sanitizer: DomSanitizer){}
  ngOnInit() {
    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }
}
