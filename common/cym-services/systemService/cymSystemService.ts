import {EventEmitter, Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class CymService implements OnDestroy {

  // network status
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading = this.isLoadingSubject.asObservable();

  constructor() {
  }

  ngOnDestroy() {
  }

  setLoader(value: boolean) {
    this.isLoadingSubject.next(value);
  }
}

