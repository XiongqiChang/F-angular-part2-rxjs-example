import { Routes } from '@angular/router';

import { NoContentComponent } from './no-content/no-content';
import { RxJSExampleComponent } from './rxjs-example/rxjs-example.component';
import { ObservableExampleComponent } from './observable-example/observable-example.component';
import { OperatorExampleComponent } from './operator-example/operator-example.component';
import { HotExampleComponent } from './hot-example/hot-example.component';
import { SubjectExampleComponent } from './subject-example/subject-example.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: RxJSExampleComponent,
  },
  {
    path: 'observable',
    component: ObservableExampleComponent,
  },
  {
    path: 'operator',
    component: OperatorExampleComponent,
  },
  {
    path: 'hot',
    component: HotExampleComponent,
  },
  {
    path: 'subject',
    component: SubjectExampleComponent,
  },
  {
    path: '**',
    component: NoContentComponent
  }
];
