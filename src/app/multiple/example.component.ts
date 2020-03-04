import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, concat, forkJoin, merge, Observable, of, timer, zip } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-multiple-example',
  templateUrl: './example.template.html',
  styleUrls: ['./example.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultipleExampleComponent {
  autoSub: boolean;
  observableA$: Observable<string>;
  observableB$: Observable<number>;
  merge$: Observable<string | number>;
  combineLatest$: Observable<[string, number]>;
  zip$: Observable<[string, number]>;
  concat$: Observable<string | number>;
  forkJoin$: Observable<[string, number]>;
  tabs: any[];

  constructor() {
    this.autoSub = true;
    this.observableA$ = zip(timer(0, 2000), of('a', 'b')).pipe(map(([_, value]) => value));
    this.observableB$ = timer(1000, 2000).pipe(take(3));
    this.merge$ = merge(this.observableA$, this.observableB$);
    this.combineLatest$ = combineLatest([this.observableA$, this.observableB$]);
    this.zip$ = zip(this.observableA$, this.observableB$);
    this.concat$ = concat(this.observableA$, this.observableB$);
    this.forkJoin$ = forkJoin([this.observableA$, this.observableB$]);
    this.tabs = [
      { heading: 'Merge', observable: this.merge$ },
      { heading: 'CombineLatest', observable: this.combineLatest$ },
      { heading: 'Zip', observable: this.zip$ },
      { heading: 'Concat', observable: this.concat$ },
      { heading: 'ForkJoin', observable: this.forkJoin$ },
    ];
  }
}
