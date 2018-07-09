import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export const START_SIGN = 'START_SIGN';

@Injectable()
export class TimerService {
  timer$: Observable<number>;
  running$: BehaviorSubject<boolean>;

  constructor() {
    this.running$ = new BehaviorSubject(true);
    this.timer$ = Observable.interval(100);
  }

  toggle(): void {
    this.running$.next(!this.running$.value);
  }

  windowToggle(observable: Observable<any>): Observable<any> {
    return observable
      .windowToggle(
        this.running$.filter(running => running),
        () => Observable.never().takeUntil(this.running$.filter(running => !running)))
      .map(windowed => windowed.startWith(START_SIGN))
      .mergeAll();
  }
}
