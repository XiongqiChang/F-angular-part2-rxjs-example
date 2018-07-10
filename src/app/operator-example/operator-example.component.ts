import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'operator-example',
  templateUrl: './operator-example.template.html',
  styleUrls: ['./operator-example.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperatorExampleComponent {
  take$: Observable<number>;
  delay$: Observable<any>;
  startWith$: Observable<any>;
  map$: Observable<any>;
  mapTo$: Observable<string>;
  pluck$: Observable<number>;
  filter$: Observable<number>;
  reduce$: Observable<number>;
  scan$: Observable<number>;

  constructor() {
    this.take$ = Observable.interval(1000).take(5);
    this.delay$ = Observable.of('o').delay(1000);
    this.startWith$ = this.delay$.startWith('a');
    this.map$ = Observable.interval(1000).map(i => ({ time: i }));
    this.mapTo$ = Observable.interval(1000).mapTo('o');
    this.pluck$ = this.map$.pluck('time');
    this.filter$ = Observable.interval(500).filter(i => i % 2 === 0);
    this.reduce$ = this.take$.reduce((acc, cur) => acc + cur, 0);
    this.scan$ = this.take$.scan((acc, cur) => acc + cur, 0);
  }
}
