import { Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class CymService implements OnDestroy {

  // network status
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading = this.isLoadingSubject.asObservable();

  // toolbar click

  private toolBarClick = new BehaviorSubject<any>({});
  toolClick = this.toolBarClick.asObservable();

  // on clicking the pallete or details tab
  private rightSideTabClickSubject = new BehaviorSubject<any>(null);
  rightSideTabClick = this.rightSideTabClickSubject.asObservable();

  // to toggle the right sidebar
  private rightSidebarOpenSub = new BehaviorSubject<any>(null);
  isRightSidebarOpenSub = this.rightSidebarOpenSub.asObservable();
  private selectedGraphItemSub = new BehaviorSubject<any>(null);
  selectedGraphItem = this.selectedGraphItemSub.asObservable();


  constructor() {
  }

  ngOnDestroy() {
  }

  setLoader(value: boolean) {
    this.isLoadingSubject.next(value);
  }


  setToolClick(value: any) {
    this.toolBarClick.next(value);
  }

  setRightSideTabClick(value: any) {
    this.rightSideTabClickSubject.next(value);
  }
  setRightSideToolbarOpen(value: any) {
    this.rightSidebarOpenSub.next(value);
  }
  setGraphItem(value: any) {
    this.selectedGraphItemSub.next(value);
  }

}

