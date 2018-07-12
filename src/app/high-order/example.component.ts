import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'high-order-example',
  templateUrl: './example.template.html',
  styleUrls: ['./example.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HighOrderExampleComponent {
  highOrder$: Observable<Observable<number>>;
  mergeAll$: Observable<number>;
  combineAll$: Observable<number>;
  concatAll$: Observable<number>;
  switch$: Observable<number>;
  tabs: any[];

  constructor() {
    const observable1$ = Observable.timer(0, 2500).take(3).map(i => 10 + i);
    const observable2$ = Observable.timer(0, 1500).take(5).map(i => 20 + i);
    const observable3$ = Observable.timer(0, 1000).take(3).map(i => 30 + i);
    this.highOrder$ = Observable.create(observer => {
      setTimeout(() => observer.next(observable1$), 1000);
      setTimeout(() => observer.next(observable2$), 4000);
      setTimeout(() => {
        observer.next(observable3$);
        observer.complete();
      }, 6500);
    });
    this.mergeAll$ = this.highOrder$.mergeAll();
    this.combineAll$ = this.highOrder$.combineAll();
    this.concatAll$ = this.highOrder$.concatAll();
    this.switch$ = this.highOrder$.switch();
    this.tabs = [
      { heading: 'None' },
      { heading: 'Merge', observable: this.mergeAll$ },
      { heading: 'Combine', observable: this.combineAll$ },
      { heading: 'Concat', observable: this.concatAll$ },
      { heading: 'Switch', observable: this.switch$ },
    ]
  }
}
