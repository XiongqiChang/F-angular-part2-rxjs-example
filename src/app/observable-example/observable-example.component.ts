import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'observable-example',
  templateUrl: './observable-example.template.html',
  styleUrls: ['./observable-example.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObservableExampleComponent {
  of$: Observable<any>;
  from$: Observable<any>;
  range$: Observable<number>;
  interval$: Observable<number>;
  timer$: Observable<number>;
  fromEvent$: Observable<any>;
  create$: Observable<any>;
  error$: Observable<any>;

  constructor() {
    this.of$ = Observable.of('o');
    this.from$ = Observable.from([1, 'a', true]);
    this.range$ = Observable.range(1, 3);
    this.interval$ = Observable.interval(1000);
    this.timer$ = Observable.timer(0, 1000);
    this.fromEvent$ = Observable.fromEvent(window, 'keydown');
    this.create$ = Observable.create(observer => {
      observer.next(1);
      observer.next(2);
      setTimeout(() => {
        observer.next(3);
        observer.complete();
      }, 1000);
    });
    this.error$ = Observable.create(observer => {
      setTimeout(() => observer.error('some error'), 3000);
    });
  }
}
