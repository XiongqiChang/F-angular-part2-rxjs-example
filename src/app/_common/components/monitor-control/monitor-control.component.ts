import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TimerService } from '../../services/timer.service';

@Component({
  selector: 'monitor-control',
  templateUrl: './monitor-control.template.html',
  styleUrls: ['./monitor-control.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonitorControlComponent implements OnInit {
  timerText$: Observable<string>;

  constructor(private timerService: TimerService) {
  }

  ngOnInit() {
    this.timerText$ = this.timerService.running$.map(running => running ? 'pause' : 'start');
  }

  toggleTimer() {
    this.timerService.toggle();
  }
}
