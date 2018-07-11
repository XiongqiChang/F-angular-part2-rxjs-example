import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class TimerService {
  timer$: Subject<number>;
  running$: BehaviorSubject<boolean>;
  timerStart$: Observable<boolean>;
  timerStop$: Observable<boolean>;

  constructor() {
    this.timer$ = new Subject();
    this.running$ = new BehaviorSubject(false);
    this.timer$.filter(time => time > 600).mapTo(false).subscribe(this.running$);
    [this.timerStart$, this.timerStop$] = this.running$.asObservable().partition(running => running);
    this.timerStart$.switchMapTo(Observable.timer(0, 50).takeUntil(this.timerStop$)).subscribe(this.timer$);
  }

  toggle(): void {
    this.running$.next(!this.running$.value);
  }
}
