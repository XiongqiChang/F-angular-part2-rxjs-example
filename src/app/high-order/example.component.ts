import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, timer, zip, of } from 'rxjs';
import { combineAll, concatAll, map, mergeAll, switchAll, zipAll } from 'rxjs/operators';

@Component({
  selector: 'app-high-order-example',
  templateUrl: './example.template.html',
  styleUrls: ['./example.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HighOrderExampleComponent {
  highOrder$: Observable<Observable<number | string>>;
  mergeAll$: Observable<number | string>;
  combineAll$: Observable<(string | number)[]>;
  concatAll$: Observable<number | string>;
  zipAll$: Observable<(string | number)[]>;
  switch$: Observable<number | string>;
  tabs: any[];

  constructor() {
    const observable1$ = zip(timer(0, 2500), of('a', 'b', 'c')).pipe(map(([_, value]) => value));
    const observable2$ = zip(timer(0, 1500), of(5, 6, 7, 8, 9)).pipe(map(([_, value]) => value));
    const observable3$ = zip(timer(0, 1000), of('X', 'Y', 'Z')).pipe(map(([_, value]) => value));
    this.highOrder$ = new Observable(observer => {
      setTimeout(() => observer.next(observable1$), 1000);
      setTimeout(() => observer.next(observable2$), 1000 + 3000);
      setTimeout(() => {
        observer.next(observable3$);
        observer.complete();
      }, 1000 + 3000 + 2500);
    });
    this.mergeAll$ = this.highOrder$.pipe(mergeAll());
    this.combineAll$ = this.highOrder$.pipe(combineAll());
    this.concatAll$ = this.highOrder$.pipe(concatAll());
    this.zipAll$ = this.highOrder$.pipe(zipAll());
    this.switch$ = this.highOrder$.pipe(switchAll());
    this.tabs = [
      { heading: 'None' },
      { heading: 'Merge', observable: this.mergeAll$ },
      { heading: 'Combine', observable: this.combineAll$ },
      { heading: 'Zip', observable: this.zipAll$ },
      { heading: 'Concat', observable: this.concatAll$ },
      { heading: 'Switch', observable: this.switch$ },
    ];
  }
}
