import { Routes } from '@angular/router';

import { NoContentComponent } from './no-content/no-content';
import { RxJSExampleComponent } from './rxjs-example/rxjs-example.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: RxJSExampleComponent,
  },
  {
    path: '**',
    component: NoContentComponent
  }
];
