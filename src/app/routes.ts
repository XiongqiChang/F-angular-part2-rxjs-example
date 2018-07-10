import { Routes } from '@angular/router';

import { NoContentComponent } from './no-content/no-content';
import { RxJSExampleComponent } from './rxjs-example/rxjs-example.component';
import { ObservableExampleComponent } from './observable-example/observable-example.component';
import { OperatorExampleComponent } from './operator-example/operator-example.component';

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
    path: '**',
    component: NoContentComponent
  }
];
