import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as _ from 'lodash';
import { TimerService } from '../../services/timer.service';

enum MONITOR_TYPE {
  START, STOP, TERMINATE,
  TIMER, VALUE, INNER,
  SUBSCRIBE, UNSUBSCRIBE,
  COMPLETE, ERROR,
}

@Component({
  selector: 'observable-monitor',
  templateUrl: './observable-monitor.template.html',
  styleUrls: ['./observable-monitor.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObservableMonitorComponent implements OnInit {
  @Input() name: string;
  @Input() autoSub: boolean;
  @Input() breakable: boolean = true;
  @Input() observable: Observable<any>;
  @Input() highOrder: boolean = false;
  @Input() inner: boolean = false;
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
      this.subject$.subscribe(observer);
      this.timerService.timer$.map(time => ({ type: MONITOR_TYPE.TIMER, value: time })).subscribe(observer);
      this.timerService.running$.map(running => ({ type: running ? MONITOR_TYPE.START : MONITOR_TYPE.STOP })).subscribe(observer);
    }).scan(this.concatValues.bind(this), [])
      .takeUntil(this.status$.filter(status => status === MONITOR_TYPE.TERMINATE));
  }

  initButtonStream() {
    this.buttonText$ = this.status$.map(status => this.breakable && status === MONITOR_TYPE.SUBSCRIBE ? 'break' : 'observe');
    this.buttonDisabled$ = Observable.combineLatest(this.status$, this.timerService.running$)
      .map(([status, running]) => !running || (status === MONITOR_TYPE.SUBSCRIBE && !this.breakable));
  }

  initStatusSub() {
    this.status$.distinctUntilChanged().delay(0)
      .filter(status => status === MONITOR_TYPE.SUBSCRIBE)
      .switchMap(() => this.observable
        .takeUntil(Observable.merge(
          this.status$.filter(status => status !== MONITOR_TYPE.SUBSCRIBE),
          this.timerService.running$.filter(running => !running),
        ))
        .map((value, index) => [value, index + 1])
        .do({
          next: ([value, index]) => {
            if (this.highOrder) {
              this.subject$.next({ type: MONITOR_TYPE.VALUE, value: index });
              this.subject$.next({
                type: MONITOR_TYPE.INNER,
                value: value.do({ complete: () => _.remove(this.innerLevels, innerLevel => innerLevel === level)}),
                level: index,
              });
            } else {
              this.subject$.next({ type: MONITOR_TYPE.VALUE, value });
            }
          },
          error: error => {
            this.subject$.next(error);
            this.status$.next(MONITOR_TYPE.ERROR);
            this.status$.next(null);
          },
          complete: () => {
            if (this.timerService.running$.value) {
              this.status$.next(MONITOR_TYPE.COMPLETE);
            }
            this.status$.next(null);
            if (this.inner) {
              this.status$.next(MONITOR_TYPE.TERMINATE);
            }
          },
        }))
      .subscribe();
  }

  initAutoSub() {
    if (this.inner || this.autoSub) {
      this.timerService.running$
        .filter(running => running)
        .subscribe(() => this.status$.next(MONITOR_TYPE.SUBSCRIBE));
    }
  }

  concatValues(accumulator, value) {
    switch (value.type) {
      case MONITOR_TYPE.START:
        return [];
      case MONITOR_TYPE.ERROR:
      case MONITOR_TYPE.COMPLETE:
      case MONITOR_TYPE.UNSUBSCRIBE:
        accumulator.forEach(node => {
          if (node.status === MONITOR_TYPE.SUBSCRIBE) {
            node.status = this.status$.value;
          }
        });
        return accumulator;
      case MONITOR_TYPE.TIMER:
      case MONITOR_TYPE.VALUE:
      case MONITOR_TYPE.INNER:
        return accumulator.concat({ ...value, status: this.status$.value });
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
