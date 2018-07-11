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
  concatAll$: Observable<number>;
  switch$: Observable<number>;
  tabs: any[];

  constructor() {
    this.highOrder$ = Observable.concat(
      Observable.never().takeUntil(Observable.timer(1000)),
      Observable.of(Observable.timer(0, 2500).take(3).map(i => 10 + i)),
      Observable.never().takeUntil(Observable.timer(3000)),
      Observable.of(Observable.timer(0, 1500).take(5).map(i => 20 + i)),
      Observable.never().takeUntil(Observable.timer(2500)),
      Observable.of(Observable.timer(0, 1000).take(3).map(i => 30 + i)),
    );
    this.mergeAll$ = this.highOrder$.mergeAll();
    this.concatAll$ = this.highOrder$.concatAll();
    this.switch$ = this.highOrder$.switch();
    this.tabs = [
      { heading: 'None' },
      { heading: 'Merge', observable: this.mergeAll$ },
      { heading: 'Concat', observable: this.concatAll$ },
      { heading: 'Switch', observable: this.switch$ },
    ]
  }
}
