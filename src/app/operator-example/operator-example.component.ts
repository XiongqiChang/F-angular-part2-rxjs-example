import { ChangeDetectionStrategy, Component } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { delay, distinct, distinctUntilChanged, filter, map, mapTo, pluck, reduce, scan, startWith, take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-operator-example',
  templateUrl: './operator-example.template.html',
  styleUrls: ['./operator-example.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperatorExampleComponent {
  interval$: Observable<number>;
  take$: Observable<number>;
  delay$: Observable<number>;
  startWith$: Observable<number>;
  delayFirst$: Observable<number>;
  startWithFirst$: Observable<number>;
  distinct$: Observable<number>;
  distinctUntilChange$: Observable<number>;
  takeUntil$: Observable<number>;
  takeUntilSign$: Observable<any>;
  map$: Observable<any>;
  mapTo$: Observable<string>;
  pluck$: Observable<number>;
  filter$: Observable<number>;
  reduce$: Observable<number>;
  scan$: Observable<number>;
  autoSub: boolean = false;

  constructor() {
    this.interval$ = interval(1000);
    this.take$ = this.interval$.pipe(take(5));
    this.delay$ = this.take$.pipe(delay(1000));
    this.startWith$ = this.take$.pipe(startWith(100));
    this.distinct$ = this.interval$.pipe(distinct());
    this.distinctUntilChange$ = this.interval$.pipe(distinctUntilChanged());

    this.takeUntilSign$ = new Observable(observer => {
      setTimeout(() => observer.next(), 3456);
    });
    this.takeUntil$ = this.interval$.pipe(takeUntil(this.takeUntilSign$));

    this.delayFirst$ = this.take$.pipe(delay(1000), startWith(100));
    this.startWithFirst$ = this.take$.pipe(startWith(100), delay(1000));

    this.map$ = this.interval$.pipe(map(i => ({ i: i })));
    this.mapTo$ = this.interval$.pipe(mapTo('o'));
    this.pluck$ = this.map$.pipe(pluck('i'));
    this.filter$ = this.interval$.pipe(filter(i => i % 2 === 0));

    this.reduce$ = this.take$.pipe(reduce((acc, cur) => acc + cur, 0));
    this.scan$ = this.take$.pipe(scan((acc, cur) => acc + cur, 0));
  }
}
