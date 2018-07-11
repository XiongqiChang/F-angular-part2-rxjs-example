import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'operator-example',
  templateUrl: './operator-example.template.html',
  styleUrls: ['./operator-example.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperatorExampleComponent {
  interval$: Observable<number>;
  take$: Observable<number>;
  delay$: Observable<number>;
  startWith$: Observable<number>;
  map$: Observable<any>;
  mapTo$: Observable<string>;
  pluck$: Observable<number>;
  filter$: Observable<number>;
  reduce$: Observable<number>;
  scan$: Observable<number>;
  autoSub: boolean = true;

  constructor() {
    this.interval$ = Observable.interval(1000);
    this.take$ = this.interval$.take(5);
    this.delay$ = this.take$.delay(1000);
    this.startWith$ = this.delay$.startWith(100);
    this.map$ = this.interval$.map(i => ({ i: i }));
    this.mapTo$ = this.interval$.mapTo('o');
    this.pluck$ = this.map$.pluck('i');
    this.filter$ = this.interval$.filter(i => i % 2 === 0);
    this.reduce$ = this.take$.reduce((acc, cur) => acc + cur, 0);
    this.scan$ = this.take$.scan((acc, cur) => acc + cur, 0);
  }
}
