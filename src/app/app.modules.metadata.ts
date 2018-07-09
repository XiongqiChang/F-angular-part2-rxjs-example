import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ROUTES } from './routes';
import { AppComponent } from './app.component';
import { COMPONENT_PROVIDERS } from './components';
import { TimerService } from './_common/services/timer.service';

export const AppModulesMetaData = {
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    ...COMPONENT_PROVIDERS,
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    TimerService,
  ]
};
