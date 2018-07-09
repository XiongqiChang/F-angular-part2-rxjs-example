import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class TimerService {
  timer$: Observable<number>;
  running$: BehaviorSubject<boolean>;

  constructor() {
    this.running$ = new BehaviorSubject(false);
    this.timer$ = Observable.interval(100)
      .windowToggle(
        this.running$.filter(running => running),
        () => Observable.never().takeUntil(this.running$.filter(running => !running)))
      .mergeAll();
  }

  toggle() {
    this.running$.next(!this.running$.value);
  }
}
