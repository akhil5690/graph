import {Component, EventEmitter, Input, OnChanges, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class RightSidebarComponent implements OnChanges{
  items: any;
  nodeData: any;
  openPopUp = false;

  @Input() details: any;
  @Output() isRightSidebarOpen = new EventEmitter();

  ngOnChanges(): void {
    console.log(this.details?.tag);
    if (this.details) {
      this.items = [this.details.tag];
      this.nodeData = this.items.flatMap((item: any) =>
        Object.entries(item).map(([label, value]) => ({label, value}))
      );
      this.openPopUp = true;
    } else {
      this.openPopUp = false;
    }
    this.isRightSidebarOpen.emit(this.openPopUp);
  }

  open(isOpen:boolean) {
    this.openPopUp = isOpen && this.details;
    this.isRightSidebarOpen.emit(this.openPopUp);
  }
}
