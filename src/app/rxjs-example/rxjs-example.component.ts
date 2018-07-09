import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'rxjs-example',
  templateUrl: './rxjs-example.template.html',
  styleUrls: ['./rxjs-example.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RxJSExampleComponent {
  observable$: Observable<any>;

  constructor() {
    this.observable$ = Observable.create(observer => {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      setTimeout(() => {
        observer.next(5);
        observer.complete();
      }, 1500);
    });
  }
}
