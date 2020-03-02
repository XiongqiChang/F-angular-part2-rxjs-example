import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { from, fromEvent, interval, Observable, of, range, timer } from 'rxjs';

@Component({
  selector: 'app-observable-example',
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
  @ViewChild('button') button: ElementRef<HTMLButtonElement>;

  constructor() {
    this.of$ = of('o');
    this.from$ = from([1, 'a', true]);
    this.range$ = range(1, 3);
    this.interval$ = interval(1000);
    this.timer$ = timer(0, 1000);
    this.create$ = new Observable(observer => {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      setTimeout(() => {
        observer.next(3);
        observer.complete();
      }, 1000);
    });
  }

  initFromEvent(): void {
    setTimeout(() => this.fromEvent$ = fromEvent(this.button.nativeElement, 'click'));
  }
}
