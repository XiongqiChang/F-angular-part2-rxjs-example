import { ChangeDetectionStrategy, Component } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { publish, publishReplay, refCount, share, take } from 'rxjs/operators';

@Component({
  selector: 'app-hot-example',
  templateUrl: './hot-example.template.html',
  styleUrls: ['./hot-example.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotExampleComponent {
  cold$: Observable<number>;
  share$: Observable<number>;
  publish$: Observable<number>;
  publishReplay$: Observable<number>;
  tabs: any[];

  constructor() {
    this.cold$ = interval(1500).pipe(take(3));
    this.share$ = this.cold$.pipe(share());
    this.publish$ = this.cold$.pipe(publish(), refCount());
    this.publishReplay$ = this.cold$.pipe(publishReplay(1), refCount());
    this.tabs = [
      { heading: 'Cold', observable: this.cold$ },
      { heading: 'Share', observable: this.share$ },
      { heading: 'Publish', observable: this.publish$ },
      { heading: 'PublishReplay', observable: this.publishReplay$ },
    ];
  }

  republish() {
    this.tabs[2].observable = this.cold$.pipe(publish(), refCount());
  }
}
