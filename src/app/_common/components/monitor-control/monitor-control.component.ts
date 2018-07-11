import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { TimerService } from '../../services/timer.service';

@Component({
  selector: 'monitor-control',
  templateUrl: './monitor-control.template.html',
  styleUrls: ['./monitor-control.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonitorControlComponent implements OnInit {
  @Input() subject: Subject<any>;
  timerText$: Observable<string>;
  count: number = 0;

  constructor(private timerService: TimerService) {
  }

  ngOnInit() {
    this.timerText$ = this.timerService.running$.map(running => running ? 'stop' : 'start');
  }

  toggleTimer() {
    this.timerService.toggle();
  }

  next() {
    if (this.subject) {
      this.subject.next(this.count += 1);
    }
  }
}
