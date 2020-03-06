import { Routes } from '@angular/router';

import { NoContentComponent } from './no-content/no-content';
import { ObservableExampleComponent } from './observable-example/observable-example.component';
import { OperatorExampleComponent } from './operator-example/operator-example.component';
import { HotExampleComponent } from './hot-example/hot-example.component';
import { SubjectExampleComponent } from './subject-example/subject-example.component';
import { MultipleExampleComponent } from './multiple/example.component';
import { HighOrderExampleComponent } from './high-order/example.component';
import { HighOrderMapExampleComponent } from './high-order-map/example.component';
import { ErrorHandleExampleComponent } from './error-handle/example.component';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'observable',
    pathMatch: 'full',
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
    path: 'multiple',
    component: MultipleExampleComponent,
  },
  {
    path: 'high-order',
    component: HighOrderExampleComponent,
  },
  {
    path: 'high-order-map',
    component: HighOrderMapExampleComponent,
  },
  {
    path: 'error-handle',
    component: ErrorHandleExampleComponent,
  },
  {
    path: '**',
    component: NoContentComponent
  }
];
