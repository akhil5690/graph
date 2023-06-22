import {Component, Input, OnInit} from '@angular/core';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'cym-dropdown',
  templateUrl: './cym-dropdown.component.html',
  styleUrls: ['./cym-dropdown.component.scss']
})

export class CymDropdownComponent implements OnInit {
  @Input() cities!: City[];

  selectedCity!: City;

  ngOnInit() {

  }
}
