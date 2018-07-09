import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';
import { TimerService } from '../../services/timer.service';

@Component({
  selector: 'observable-monitor',
  templateUrl: './observable-monitor.template.html',
  styleUrls: ['./observable-monitor.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObservableMonitorComponent implements OnInit {
  @Input() observable: Observable<any>;
  subject$: Subject<any>;
  values$: Observable<any[]>;

  constructor(private timerService: TimerService) {
    this.subject$ = new Subject();
  }

  ngOnInit() {
    this.values$ = this.subject$.merge(this.timerService.timer$.mapTo(null))
      .scan(this.concatValues, []);
  }

  concatValues(accumulator, value) {
    const values = accumulator.concat(value);
    return _.filter(values, _.isNull).length > 500 ? values.slice(1) : values;
  }

  subscribe() {
    this.observable.subscribe(value => this.subject$.next(value));
  }
}
