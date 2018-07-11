import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'high-order-example',
  templateUrl: './example.template.html',
  styleUrls: ['./example.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HighOrderExampleComponent {
  highOrder$: Observable<Observable<any>>;

  constructor() {
    this.highOrder$ = Observable.timer(1000, 3000).take(3)
      .map(n => Observable.timer(0, 1000).take(3).map(m => (n + 1) * 10 + m));
  }
}
