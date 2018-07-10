import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as _ from 'lodash';
import { TimerService } from '../../services/timer.service';

enum MONITOR_TYPE {
  START, STOP,
  TIMER, VALUE,
  SUBSCRIBE, UNSUBSCRIBE, COMPLETE,
}

@Component({
  selector: 'observable-monitor',
  templateUrl: './observable-monitor.template.html',
  styleUrls: ['./observable-monitor.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObservableMonitorComponent implements OnInit {
  @Input() title: string;
  @Input() autoSub: number = 0;
  @Input() breakable: boolean = false;
  @Input() observable: Observable<any>;
  subject$: Subject<any>;
  monitor$: Observable<any[]>;
  status$: BehaviorSubject<MONITOR_TYPE>;
  buttonText$: Observable<string>;
  buttonDisabled$: Observable<boolean>;
  monitorType = MONITOR_TYPE;

  constructor(private timerService: TimerService) {
    this.subject$ = new Subject();
    this.status$ = new BehaviorSubject(null);
  }

  ngOnInit() {
    this.initMonitor();
    this.initButtonStream();
    this.initStatusSub();
    this.initAutoSub();
  }

  initMonitor() {
    this.monitor$ = Observable.create(observer => {
      this.status$.map(status => ({ type: status })).subscribe(observer);
      this.subject$.map(value => ({ type: MONITOR_TYPE.VALUE, value })).subscribe(observer);
      this.timerService.timer$.map(time => ({ type: MONITOR_TYPE.TIMER, value: time })).subscribe(observer);
      this.timerService.running$.map(running => ({ type: running ? MONITOR_TYPE.START : MONITOR_TYPE.STOP })).subscribe(observer);
    }).scan(this.concatValues.bind(this), []);
  }

  initButtonStream() {
    this.buttonText$ = this.status$.map(status => this.breakable && status === MONITOR_TYPE.SUBSCRIBE ? 'break' : 'observe');
    this.buttonDisabled$ = Observable.combineLatest(this.status$, this.timerService.running$)
      .map(([status, running]) => !running || (status === MONITOR_TYPE.SUBSCRIBE && !this.breakable));
  }

  initStatusSub() {
    this.status$.distinctUntilChanged()
      .filter(status => status === MONITOR_TYPE.SUBSCRIBE)
      .switchMap(() => this.observable
        .takeUntil(Observable.merge(
          this.status$.filter(status => status !== MONITOR_TYPE.SUBSCRIBE),
          this.timerService.running$.filter(running => !running),
        ))
        .do({
          next: value => this.subject$.next(value),
          complete: () => {
            this.status$.next(MONITOR_TYPE.COMPLETE);
            this.status$.next(null);
          },
        }))
      .subscribe();
  }

  initAutoSub() {
    if (this.autoSub > 0) {
      this.timerService.running$
        .filter(running => running)
        .delay(this.autoSub * 1000)
        .subscribe(() => this.status$.next(MONITOR_TYPE.SUBSCRIBE));
    }
  }

  concatValues(accumulator, { type, value }) {
    switch (type) {
      case MONITOR_TYPE.START:
        return [];
      case MONITOR_TYPE.COMPLETE:
      case MONITOR_TYPE.UNSUBSCRIBE:
        return accumulator.map(node => node.status === MONITOR_TYPE.SUBSCRIBE ? { ...node, status: this.status$.value } : node);
      case MONITOR_TYPE.TIMER:
      case MONITOR_TYPE.VALUE:
        const values = accumulator.concat({ type, value, status: this.status$.value });
        return _.filter(values, { type: MONITOR_TYPE.TIMER }).length > 500 ? values.slice(1) : values;
      default:
        return accumulator;
    }
  }

  observe() {
    if (this.status$.value !== MONITOR_TYPE.SUBSCRIBE) {
      return this.status$.next(MONITOR_TYPE.SUBSCRIBE);
    }

    if (!this.breakable) {
      return;
    }

    this.status$.next(MONITOR_TYPE.UNSUBSCRIBE);
    this.status$.next(null);
  }
}
