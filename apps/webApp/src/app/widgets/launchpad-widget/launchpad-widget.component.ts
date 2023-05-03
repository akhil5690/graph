import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-launchpad-widget',
  templateUrl: './launchpad-widget.component.html',
  styleUrls: ['./launchpad-widget.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LaunchpadWidgetComponent {
  constructor( private router:Router) {
  }

  showGraph() {
    this.router.navigate(['/launchpad/dashboard']).then()

  }
}
