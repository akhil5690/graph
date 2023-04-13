import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-widget-frame',
  templateUrl: './widget-frame.component.html',
  styleUrls: ['./widget-frame.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WidgetFrameComponent implements OnInit{
  theme: string = 'lightTheme';
  checked!: boolean;

  ngOnInit(){
    document.body.className = this.theme;
  }
  toggleTheme() {
    this.theme = this.theme === 'lightTheme' ? 'darkTheme' : 'lightTheme';
    this.checked = this.theme === 'darkTheme';
    document.body.className = this.theme;
  }
}
