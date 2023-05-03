import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-dashboard-widget',
  templateUrl: './dashboard-widget.component.html',
  styleUrls: ['./dashboard-widget.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardWidgetComponent {
  isGraphVisible = false;
  url = "http://35.160.251.131/graph/graph.html?dataset=fe55dd8433375be9bf86ad5b2994db41&type=vgraph&viztoken=75906ef38fe94c758e4e4dee7c82a4bc&usertag=4a375638-pygraphistry-0.28.7&splashAfter=false&info=true&play=5000&session=cbf085fdf1994877a118a4d7088e8576";

  constructor() {
  }

  showGraph() {
    this.isGraphVisible = true;
  }
}
