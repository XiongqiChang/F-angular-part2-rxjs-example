import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'operator-example',
  templateUrl: './operator-example.template.html',
  styleUrls: ['./operator-example.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperatorExampleComponent {
  take$: Observable<any>;

  constructor() {
    this.take$ = Observable.interval(1000).take(3);
  }
}
