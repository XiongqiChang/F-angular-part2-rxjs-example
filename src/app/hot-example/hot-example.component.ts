import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'hot-example',
  templateUrl: './hot-example.template.html',
  styleUrls: ['./hot-example.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotExampleComponent {
  cold$: Observable<any>;
  share$: Observable<any>;
  publish$: Observable<any>;
  publishReplay$: Observable<any>;

  constructor() {
    this.cold$ = Observable.interval(1000).take(5);
    this.share$ = this.cold$.share();
    this.publish$ = this.cold$.publish().refCount();
    this.publishReplay$ = this.cold$.publishReplay().refCount();
  }
}
