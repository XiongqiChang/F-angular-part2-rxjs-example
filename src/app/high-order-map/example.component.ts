import { ChangeDetectionStrategy, Component } from '@angular/core';
import { concat, Observable, timer } from 'rxjs';
import { concatMap, map, mapTo, mergeMap, switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-high-order-map-example',
  templateUrl: './example.template.html',
  styleUrls: ['./example.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HighOrderMapExampleComponent {
  timer$: Observable<number>;
  map$: Observable<Observable<number>>;
  mergeMap$: Observable<number>;
  concatMap$: Observable<number>;
  switchMap$: Observable<number>;
  tabs: {heading: string, observable?: Observable<any>}[];

  constructor() {
    const observable1$ = timer(0, 2500).pipe(take(3), map((i: number) => 10 + i));
    const observable2$ = timer(0, 1500).pipe(take(5), map((i: number) => 20 + i));
    const observable3$ = timer(0, 1000).pipe(take(3), map((i: number) => 30 + i));
    const observables = [null, observable1$, observable2$, observable3$];
    this.timer$ = concat(
      timer(1000).pipe(mapTo(1)),
      timer(3000).pipe(mapTo(2)),
      timer(2500).pipe(mapTo(3)),
    );

    this.map$ = this.timer$.pipe(map((i: number) => observables[i]));
    this.mergeMap$ = this.timer$.pipe(mergeMap((i: number) => observables[i]));
    this.concatMap$ = this.timer$.pipe(concatMap((i: number) => observables[i]));
    this.switchMap$ = this.timer$.pipe(switchMap((i: number) => observables[i]));
    this.tabs = [
      { heading: 'None' },
      { heading: 'Map', observable: this.map$ },
      { heading: 'Merge', observable: this.mergeMap$ },
      { heading: 'Concat', observable: this.concatMap$ },
      { heading: 'Switch', observable: this.switchMap$ },
    ];
  }
}
