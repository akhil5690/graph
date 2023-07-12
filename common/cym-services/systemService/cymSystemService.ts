import {EventEmitter, Injectable, OnDestroy} from '@angular/core';
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

  constructor() {
  }

  ngOnDestroy() {
  }

  setLoader(value: boolean) {
    this.isLoadingSubject.next(value);
  }

  /*
  ** value ={
  * event: toolEvent, id: randomMath()}
  *
   */
  setToolClick(value: any) {
    this.toolBarClick.next(value);
  }
}

