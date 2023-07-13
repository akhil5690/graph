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

  // network status
  private rightSideTabClickSubject = new BehaviorSubject<any>(null);
  rightSideTabClick = this.rightSideTabClickSubject.asObservable();


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

}

