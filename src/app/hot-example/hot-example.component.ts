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
  tabs: any[];

  constructor() {
    this.cold$ = Observable.interval(1500).take(3);
    this.share$ = this.cold$.share();
    this.publish$ = this.cold$.publish().refCount();
    this.publishReplay$ = this.cold$.publishReplay().refCount();
    this.tabs = [
      { heading: 'Cold', observable: this.cold$ },
      { heading: 'Share', observable: this.share$ },
      { heading: 'Publish', observable: this.publish$ },
      { heading: 'PublishReplay', observable: this.publishReplay$ },
    ];
  }
}
