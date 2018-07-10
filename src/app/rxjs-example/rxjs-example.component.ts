import { Component, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TimerService } from '../_common/services/timer.service';

@Component({
  selector: 'rxjs-example',
  templateUrl: './rxjs-example.template.html',
  styleUrls: ['./rxjs-example.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RxJSExampleComponent implements AfterViewInit {
  observable$: Observable<any>;

  constructor(private timerService: TimerService) {
    this.observable$ = Observable.create(observer => {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      Observable.interval(1000).take(3).map(x => x + 4).subscribe(observer);
    }).share();
    // this.observable$ = Observable.timer(0, 1000);
    // this.observable$ = Observable.timer(0, 1000).share();
    // this.observable$ = Observable.timer(0, 1000).publishReplay(2).refCount();
    // this.observable$ = Observable.from(Array.from("observable"))
    //   .map((value, index) => [value, index])
    //   .mergeMap(([value, index]: any[]) => Observable.of(value).delay((1000 * index)));
  }

  ngAfterViewInit() {
    this.timerService.toggle();
  }
}
