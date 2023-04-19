import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-widget-frame',
  templateUrl: './widget-frame.component.html',
  styleUrls: ['./widget-frame.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WidgetFrameComponent implements OnInit {
  @Input() frame_type!: string;
  @Output() isDarkTheme = new EventEmitter<string>();
  theme: string = 'lightTheme';
  checked!: boolean;

  ngOnInit() {
    this.isDarkTheme.emit('lightTheme');
  }

  toggleTheme() {
    this.theme = this.theme === 'lightTheme' ? 'darkTheme' : 'lightTheme';
    this.checked = this.theme === 'darkTheme';
    this.isDarkTheme.emit(this.theme);
  }

  getClass(frame_type:string) {
    switch (frame_type){
      case 'frame-with-sidebar': return 'frame-with-sidebar';
      default: return 'only-main'
    }
  }
}
