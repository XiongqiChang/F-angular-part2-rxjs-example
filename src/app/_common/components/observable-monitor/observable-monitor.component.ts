import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, merge, Observable, Subject } from 'rxjs';
import { delay, distinctUntilChanged, filter, map, scan, switchMap, takeUntil, tap } from 'rxjs/operators';
import { TimerService } from '../../services/timer.service';

enum MONITOR_TYPE {
  START, STOP,
  TIMER, VALUE, INNER,
  SUBSCRIBE, UNSUBSCRIBE,
  COMPLETE, ERROR,
}

@Component({
  selector: 'app-observable-monitor',
  templateUrl: './observable-monitor.template.html',
  styleUrls: ['./observable-monitor.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObservableMonitorComponent implements OnInit {
  @Input() name: string;
  @Input() autoSub: boolean;
  @Input() breakable: boolean = true;
  @Input() observable: Observable<any> | Subject<any>;
  @Input() highOrder: boolean = false;
  @Input() inner: boolean = false;
  @Input() subject: boolean = false;
  @Input() noContent: boolean = false;
  subject$: Subject<any>;
  monitor$: Observable<any[]>;
  status$: BehaviorSubject<MONITOR_TYPE>;
  buttonText$: Observable<string>;
  buttonDisabled$: Observable<boolean>;
  monitorType = MONITOR_TYPE;
  counter: number = 0;

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
    this.monitor$ = new Observable(observer => {
      this.status$.pipe(map(status => ({ type: status }))).subscribe(observer);
      this.subject$.subscribe(observer);
      this.timerService.timer$.pipe(map(time => ({ type: MONITOR_TYPE.TIMER, value: time }))).subscribe(observer);
      this.timerService.running$.pipe(map(running => ({ type: running ? MONITOR_TYPE.START : MONITOR_TYPE.STOP }))).subscribe(observer);
    }).pipe(scan(this.concatValues.bind(this), []));
  }

  initButtonStream() {
    this.buttonText$ = this.status$.pipe(map(status => this.breakable && status === MONITOR_TYPE.SUBSCRIBE ? 'break' : 'observe'));
    this.buttonDisabled$ = combineLatest([this.status$, this.timerService.running$])
      .pipe(map(([status, running]) => !running || (status === MONITOR_TYPE.SUBSCRIBE && !this.breakable)));
  }

  initStatusSub() {
    this.status$.pipe(
      distinctUntilChanged(),
      delay(0),
      filter(status => status === MONITOR_TYPE.SUBSCRIBE),
      switchMap(() => this.observable
        .pipe(tap({
            complete: () => {
              if (this.inner || this.subject) {
                this.status$.next(MONITOR_TYPE.COMPLETE);
                this.subject$.complete();
              }
            },
          }),
          takeUntil(merge(
            this.status$.pipe(filter(status => status !== MONITOR_TYPE.SUBSCRIBE)),
            this.timerService.running$.pipe(filter(running => !running)),
          )),
          map((value, index) => [value, index + 1]),
          tap({
            next: ([value, index]) => {
              if (this.highOrder) {
                this.subject$.next({ type: MONITOR_TYPE.VALUE, value: index });
                this.subject$.next({
                  type: MONITOR_TYPE.INNER,
                  level: index,
                  value,
                });
              } else {
                this.subject$.next({ type: MONITOR_TYPE.VALUE, value: JSON.stringify(value) });
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
            },
          }),
        ),
      ),
    ).subscribe();
  }

  initAutoSub() {
    if (this.inner || this.subject || this.autoSub) {
      this.timerService.running$
        .pipe(filter((running: boolean) => running))
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

    if (this.breakable) {
      this.status$.next(MONITOR_TYPE.UNSUBSCRIBE);
      this.status$.next(null);
    }
  }

  next() {
    (this.observable as Subject<any>).next(this.counter++);
  }

  complete() {
    (this.observable as Subject<any>).complete();
  }
}
