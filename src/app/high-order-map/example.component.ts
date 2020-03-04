import { ChangeDetectionStrategy, Component } from '@angular/core';
import { concat, Observable, timer } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { zip } from 'rxjs/internal/observable/zip';
import { concatMap, map, mapTo, mergeMap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-high-order-map-example',
  templateUrl: './example.template.html',
  styleUrls: ['./example.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HighOrderMapExampleComponent {
  timer$: Observable<number | string>;
  map$: Observable<Observable<number | string>>;
  mergeMap$: Observable<number | string>;
  concatMap$: Observable<number | string>;
  switchMap$: Observable<number | string>;
  tabs: {heading: string, observable?: Observable<any>}[];

  constructor() {
    const observable1$ = zip(timer(0, 2500), of('a', 'b', 'c')).pipe(map(([_, value]) => value));
    const observable2$ = zip(timer(0, 1500), of(5, 6, 7, 8, 9)).pipe(map(([_, value]) => value));
    const observable3$ = zip(timer(0, 1000), of('X', 'Y', 'Z')).pipe(map(([_, value]) => value));
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
      { heading: 'Map', observable: this.map$ },
      { heading: 'Merge', observable: this.mergeMap$ },
      { heading: 'Concat', observable: this.concatMap$ },
      { heading: 'Switch', observable: this.switchMap$ },
    ];
  }
}
