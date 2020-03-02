import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { catchError, map, mergeMapTo, retry, startWith, take } from 'rxjs/operators';

@Component({
  selector: 'app-multiple-example',
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
    this.error$ = timer(2000).pipe(
      map(() => {
        throw Error('error');
      }),
      startWith('start'),
    );
    const errorHandler = error => new Observable(observer => {
      observer.next('error');
      setTimeout(() => {
        observer.next('end');
        observer.complete();
      }, 500);
    });

    this.catch$ = this.error$.pipe(catchError(errorHandler));
    this.retry$ = this.error$.pipe(retry(2));
    const timer$ = timer(1000, 2000).pipe(take(3));
    this.mergeMap$ = timer$.pipe(mergeMapTo(this.error$));
    this.catchMergeMapped$ = this.mergeMap$.pipe(catchError(errorHandler));
    this.mergeMapCaught$ = timer$.pipe(mergeMapTo(this.catch$));
  }
}
