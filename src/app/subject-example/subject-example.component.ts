import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncSubject, BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Component({
  selector: 'app-subject-example',
  templateUrl: './subject-example.template.html',
  styleUrls: ['./subject-example.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubjectExampleComponent {
  subject$: Subject<any>;
  replaySubject$: ReplaySubject<any>;
  behaviorSubject$: BehaviorSubject<any>;
  asyncSubject$: AsyncSubject<any>;
  tabs: any[];

  constructor() {
    this.subject$ = new Subject();
    this.replaySubject$ = new ReplaySubject();
    this.behaviorSubject$ = new BehaviorSubject(null);
    this.asyncSubject$ = new AsyncSubject();
    this.tabs = [
      { heading: 'Subject', subject: this.subject$ },
      { heading: 'ReplaySubject', subject: this.replaySubject$ },
      { heading: 'BehaviorSubject', subject: this.behaviorSubject$ },
      { heading: 'asyncSubject', subject: this.asyncSubject$ },
    ];
  }
}
