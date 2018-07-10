import { Component, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TimerService } from '../_common/services/timer.service';

@Component({
  selector: 'observable-example',
  templateUrl: './observable-example.template.html',
  styleUrls: ['./observable-example.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObservableExampleComponent implements AfterViewInit {
  of$: Observable<any>;
  from$: Observable<any>;
  interval$: Observable<number>;
  timer$: Observable<number>;
  create$: Observable<any>;

  constructor(private timerService: TimerService) {
    this.of$ = Observable.of('o');
    this.from$ = Observable.from([1, 'a', true]);
    this.interval$ = Observable.interval(1000);
    this.timer$ = Observable.timer(0, 1000);
    this.create$ = Observable.create(observer => {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      Observable.interval(1000).take(3).map(x => x + 4).subscribe(observer);
    });
  }

  ngAfterViewInit() {
    this.timerService.toggle();
  }
}
