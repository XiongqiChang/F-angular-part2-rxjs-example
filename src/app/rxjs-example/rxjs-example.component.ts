import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TimerService } from '../_common/services/timer.service';

@Component({
  selector: 'rxjs-example',
  templateUrl: './rxjs-example.template.html',
  styleUrls: ['./rxjs-example.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RxJSExampleComponent implements OnInit {
  observable$: Observable<any>;
  timerText$: Observable<string>;

  constructor(private timerService: TimerService) {
    this.observable$ = Observable.create(observer => {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      setTimeout(() => {
        observer.next(5);
        observer.complete();
      }, 1500);
    });
  }

  ngOnInit() {
    this.timerText$ = this.timerService.running$.map(running => running ? 'pause' : 'start');
  }

  toggleTimer() {
    this.timerService.toggle();
  }
}
