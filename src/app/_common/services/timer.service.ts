import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, partition, Subject, timer } from 'rxjs';
import { filter, mapTo, switchMapTo, takeUntil } from 'rxjs/operators';

@Injectable()
export class TimerService {
  timer$: Subject<number>;
  running$: BehaviorSubject<boolean>;
  timerStart$: Observable<boolean>;
  timerStop$: Observable<boolean>;

  constructor() {
    this.timer$ = new Subject();
    this.running$ = new BehaviorSubject(false);
    this.timer$.pipe(
      filter(time => time > 600),
      mapTo(false),
    ).subscribe(this.running$);
    [this.timerStart$, this.timerStop$] = partition(this.running$, running => running);
    this.timerStart$.pipe(switchMapTo(timer(0, 50).pipe(takeUntil(this.timerStop$)))).subscribe(this.timer$);
  }

  toggle(): void {
    this.running$.next(!this.running$.value);
  }
}
