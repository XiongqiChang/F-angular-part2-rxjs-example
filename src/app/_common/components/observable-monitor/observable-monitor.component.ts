import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as _ from 'lodash';
import { TimerService } from '../../services/timer.service';

@Component({
  selector: 'observable-monitor',
  templateUrl: './observable-monitor.template.html',
  styleUrls: ['./observable-monitor.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObservableMonitorComponent implements OnInit {
  @Input() title: string;
  @Input() breakable: boolean = false;
  @Input() observable: Observable<any>;
  subject$: Subject<any>;
  monitor$: Observable<any[]>;
  observing$: BehaviorSubject<boolean>;
  buttonText$: Observable<string>;

  constructor(private timerService: TimerService) {
    this.subject$ = new Subject();
    this.observing$ = new BehaviorSubject(false);
  }

  ngOnInit() {
    const merged$ = this.subject$.merge(this.timerService.timer$.mapTo(null));
    this.monitor$ = this.timerService.windowToggle(merged$)
      .scan(this.concatValues, []);
    this.buttonText$ = this.observing$.map(observing => this.breakable && observing ? 'break' : 'observe');
  }

  concatValues(accumulator, value) {
    const values = accumulator.concat(value);
    return _.filter(values, _.isNull).length > 500 ? values.slice(1) : values;
  }

  observe() {
    if (this.observing$.value) {
      return this.breakable && this.observing$.next(false);
    }

    this.observing$.next(true);
    this.observable
      .takeUntil(this.observing$.filter(observing => !observing))
      .subscribe({
        next: value => this.subject$.next(value),
        complete: () => this.observing$.next(false),
      });
  }
}
