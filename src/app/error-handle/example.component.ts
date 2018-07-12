import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'multiple-example',
  templateUrl: './example.template.html',
  styleUrls: ['./example.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorHandleExampleComponent {
  error$: Observable<any>;
  catch$: Observable<any>;
  retry$: Observable<any>;
  mergeMap$: Observable<any>;
  catchMergeMapped$: Observable<any>;
  mergeMapCaught$: Observable<any>;

  constructor() {
    this.error$ = Observable.timer(2000).map(() => {
      throw Error('error');
    }).startWith('start');
    const errorHandler = error => Observable.create(observer => {
      observer.next('error');
      setTimeout(() => {
        observer.next('end');
        observer.complete();
      }, 500);
    });

    this.catch$ = this.error$.catch(errorHandler);
    this.retry$ = this.error$.retry(2);
    const timer$ = Observable.timer(1000, 2000).take(3);
    this.mergeMap$ = timer$.mergeMapTo(this.error$);
    this.catchMergeMapped$ = this.mergeMap$.catch(errorHandler);
    this.mergeMapCaught$ = timer$.mergeMapTo(this.catch$);
  }
}
