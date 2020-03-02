import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { combineAll, concatAll, map, mergeAll, switchAll, take } from 'rxjs/operators';

@Component({
  selector: 'app-high-order-example',
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
    const observable1$ = timer(0, 2500).pipe(take(3), map((i: number) => 10 + i));
    const observable2$ = timer(0, 1500).pipe(take(5), map((i: number) => 20 + i));
    const observable3$ = timer(0, 1000).pipe(take(3), map((i: number) => 30 + i));
    this.highOrder$ = new Observable(observer => {
      setTimeout(() => observer.next(observable1$), 1000);
      setTimeout(() => observer.next(observable2$), 1000 + 3000);
      setTimeout(() => {
        observer.next(observable3$);
        observer.complete();
      }, 1000 + 3000 + 2500);
    });
    this.mergeAll$ = this.highOrder$.pipe(mergeAll());
    this.combineAll$ = this.highOrder$.pipe(combineAll()) as Observable<any>;
    this.concatAll$ = this.highOrder$.pipe(concatAll());
    this.switch$ = this.highOrder$.pipe(switchAll());
    this.tabs = [
      { heading: 'None' },
      { heading: 'Merge', observable: this.mergeAll$ },
      { heading: 'Combine', observable: this.combineAll$ },
      { heading: 'Concat', observable: this.concatAll$ },
      { heading: 'Switch', observable: this.switch$ },
    ];
  }
}
