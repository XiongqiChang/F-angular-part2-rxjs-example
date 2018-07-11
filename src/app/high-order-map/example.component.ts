import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'high-order-map-example',
  templateUrl: './example.template.html',
  styleUrls: ['./example.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HighOrderMapExampleComponent {
  timer$: Observable<number>;
  mergeMap$: Observable<number>;
  concatMap$: Observable<number>;
  switchMap$: Observable<number>;
  tabs: any[];

  constructor() {
    const observable1$ = Observable.timer(0, 2500).take(3).map(i => 10 + i);
    const observable2$ = Observable.timer(0, 1500).take(5).map(i => 20 + i);
    const observable3$ = Observable.timer(0, 1000).take(3).map(i => 30 + i);
    const observables = [null, observable1$, observable2$, observable3$];
    this.timer$ = Observable.concat(
      Observable.timer(1000).mapTo(1),
      Observable.timer(3000).mapTo(2),
      Observable.timer(2500).mapTo(3),
    );

    this.mergeMap$ = this.timer$.mergeMap(i => observables[i]);
    this.concatMap$ = this.timer$.concatMap(i => observables[i]);
    this.switchMap$ = this.timer$.switchMap(i => observables[i]);
    this.tabs = [
      { heading: 'None' },
      { heading: 'Merge', observable: this.mergeMap$ },
      { heading: 'Concat', observable: this.concatMap$ },
      { heading: 'Switch', observable: this.switchMap$ },
    ]
  }
}
