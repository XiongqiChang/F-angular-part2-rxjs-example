import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'multiple-example',
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
    this.observableA$ = Observable.timer(0, 2000).take(2);
    this.observableB$ = Observable.timer(1000, 2000).take(3);
    this.merge$ = Observable.merge(this.observableA$, this.observableB$);
    this.combineLatest$ = Observable.combineLatest(this.observableA$, this.observableB$);
    this.concat$ = Observable.concat(this.observableA$, this.observableB$);
    this.forkJoin$ = Observable.forkJoin(this.observableA$, this.observableB$);
    this.tabs = [
      { heading: 'Merge', observable: this.merge$ },
      { heading: 'CombineLatest', observable: this.combineLatest$ },
      { heading: 'Concat', observable: this.concat$ },
      { heading: 'ForkJoin', observable: this.forkJoin$ },
    ];
  }
}
