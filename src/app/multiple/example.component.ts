import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, concat, forkJoin, merge, Observable, timer } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-multiple-example',
  templateUrl: './example.template.html',
  styleUrls: ['./example.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultipleExampleComponent {
  autoSub: boolean;
  observableA$: Observable<any>;
  observableB$: Observable<any>;
  merge$: Observable<any>;
  combineLatest$: Observable<any[]>;
  concat$: Observable<any>;
  forkJoin$: Observable<any[]>;
  tabs: any[];

  constructor() {
    this.autoSub = true;
    this.observableA$ = timer(0, 2000).pipe(map(i => String.fromCharCode(97 + i)), take(2));
    this.observableB$ = timer(1000, 2000).pipe(take(3));
    this.merge$ = merge(this.observableA$, this.observableB$);
    this.combineLatest$ = combineLatest([this.observableA$, this.observableB$]);
    this.concat$ = concat(this.observableA$, this.observableB$);
    this.forkJoin$ = forkJoin([this.observableA$, this.observableB$]);
    this.tabs = [
      { heading: 'Merge', observable: this.merge$ },
      { heading: 'CombineLatest', observable: this.combineLatest$ },
      { heading: 'Concat', observable: this.concat$ },
      { heading: 'ForkJoin', observable: this.forkJoin$ },
    ];
  }
}
