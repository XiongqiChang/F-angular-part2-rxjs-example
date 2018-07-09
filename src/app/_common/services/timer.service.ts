import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export const START_SIGN = 'START_SIGN';

@Injectable()
export class TimerService {
  timer$: Subject<any>;
  running$: BehaviorSubject<boolean>;

  constructor() {
    this.running$ = new BehaviorSubject(false);
    this.timer$ = new Subject();
  }

  toggle(): void {
    if (this.running$.value) {
      return this.running$.next(false);
    }

    this.timer$.next(START_SIGN);
    this.running$.next(true);
    Observable.timer(0, 100).mapTo(null)
      .takeUntil(this.running$.filter(running => !running))
      .subscribe(value => this.timer$.next(value));
  }
}
