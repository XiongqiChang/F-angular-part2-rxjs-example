import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TimerService } from '../../services/timer.service';

@Component({
  selector: 'app-monitor-control',
  templateUrl: './monitor-control.template.html',
  styleUrls: ['./monitor-control.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonitorControlComponent implements OnInit {
  timerText$: Observable<string>;

  constructor(private timerService: TimerService) {
  }

  ngOnInit() {
    this.timerText$ = this.timerService.running$.pipe(map(running => running ? 'stop' : 'start'));
  }

  toggleTimer() {
    this.timerService.toggle();
  }
}
