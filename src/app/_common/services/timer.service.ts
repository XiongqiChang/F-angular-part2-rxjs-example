import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class TimerService {
  timer$: Observable<number>;
  running$: BehaviorSubject<boolean>;

  constructor() {
    this.running$ = new BehaviorSubject(false);
    this.timer$ = this.windowToggle(Observable.interval(100));
  }

  toggle(): void {
    this.running$.next(!this.running$.value);
  }

  windowToggle(observable: Observable<T>): Observable<T> {
    return observable
      .windowToggle(
        this.running$.filter(running => running),
        () => Observable.never().takeUntil(this.running$.filter(running => !running)))
      .mergeAll();
  }
}
