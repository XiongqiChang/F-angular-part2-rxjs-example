import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AsyncSubject } from 'rxjs/AsyncSubject';

@Component({
  selector: 'subject-example',
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
