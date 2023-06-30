import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {ThemeService} from "../../../cym-services/theme/theme.service";
import {CymService} from "../../../cym-services/systemService/cymSystemService";
import {ChangeDetection} from "@angular/cli/lib/config/workspace-schema";

@Component({
  selector: 'cym-widget-frame',
  templateUrl: './widget-frame.component.html',
  styleUrls: ['./widget-frame.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WidgetFrameComponent implements OnInit {
  @Input() frame_type!: string;
  @Output() isDarkTheme = new EventEmitter<string>();
  theme: string = 'lightTheme';
  isBlocked = false;
  lightColors = {'text': 'black', 'bg1': 'white', 'bg2': '#e7e7e7', 'bg3': '#F3F3F3FF', 'color_scheme': 'light'};
  darkColors = {'text': 'white', 'bg1': 'black', 'bg2': '#3d3d3d', 'bg3': '#595959', 'color_scheme': 'dark'};
  checked!: boolean;

  constructor(private themeService: ThemeService, private cymService: CymService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.isDarkTheme.emit('lightTheme');
    this.cymService.isLoading.subscribe(res => {
      this.isBlocked = res;
      this.cdr.detectChanges();
    })
  }

  toggleTheme() {
    this.theme = this.theme === 'lightTheme' ? 'darkTheme' : 'lightTheme';
    if (this.theme === 'lightTheme') {
      this.themeSetter(this.lightColors);
    } else {
      this.themeSetter(this.darkColors);
    }
    this.checked = this.theme === 'darkTheme';
    this.isDarkTheme.emit(this.theme);
  }

  getClass(frame_type: string) {
    switch (frame_type) {
      case 'frame-with-sidebar':
        return 'frame-with-sidebar';
      case 'header-main-footer-frame':
        return 'header-main-footer-frame';
      case 'header-main-frame':
        return 'header-main-frame';
      case 'header-main-right-sidebar-frame':
        return 'header-main-right-sidebar-frame';
      case 'header-main-menubar-frame':
        return 'header-main-menubar-frame';
      default:
        return 'only-main'
    }
  }

  themeSetter(colors: any) {
    this.themeService.setTheme('--primary-text-color', colors.text);
    this.themeService.setTheme('--primary-background-color', colors.bg1);
    this.themeService.setTheme('--secondary-background-color', colors.bg2);
    this.themeService.setTheme('--third-background-color', colors.bg3);
    this.themeService.setTheme('color-scheme', colors.color_scheme);
  }
}
