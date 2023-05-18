import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {ThemeService} from "../../../ui-services/theme/theme.service";

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

  lightColors = {'text':'black','bg1':'white','bg2':'#e7e7e7','bg3':'#F3F3F3FF'};
  darkColors = {'text':'white','bg1':'black','bg2':'#3d3d3d','bg3':'#595959'};
  checked!: boolean;

  constructor(private themeService:ThemeService) {
  }
  ngOnInit() {
    this.isDarkTheme.emit('lightTheme');
  }

  toggleTheme() {
    this.theme = this.theme === 'lightTheme' ? 'darkTheme' : 'lightTheme';
    if (this.theme === 'lightTheme'){
      this.themeSetter(this.lightColors);
    }
    else{
      this.themeSetter(this.darkColors);
    }
    this.checked = this.theme === 'darkTheme';
    this.isDarkTheme.emit(this.theme);
  }

  getClass(frame_type:string) {
    switch (frame_type){
      case 'frame-with-sidebar': return 'frame-with-sidebar';
      case 'header-main-frame ': return 'header-main-frame ';
      case 'header-main-right-sidebar-frame': return 'header-main-right-sidebar-frame';
      case 'header-main-menubar-frame': return 'header-main-menubar-frame';
      default: return 'only-main'
    }
  }

  themeSetter(colors:any){
    this.themeService.setTheme('primary-text-color',colors.text);
    this.themeService.setTheme('primary-background-color',colors.bg1);
    this.themeService.setTheme('secondary-background-color',colors.bg2);
    this.themeService.setTheme('third-background-color',colors.bg3);
  }
}
