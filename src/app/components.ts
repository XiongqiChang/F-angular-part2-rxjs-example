import { NavigationComponent } from './_common/components/navigation/navigation.component';
import { NoContentComponent } from './no-content/no-content';
// import { RxJSExampleComponent } from './rxjs-example/rxjs-example.component';
import { MonitorControlComponent } from './_common/components/monitor-control/monitor-control.component';
import { ObservableMonitorComponent } from './_common/components/observable-monitor/observable-monitor.component';
import { ObservableExampleComponent } from './observable-example/observable-example.component';
import { OperatorExampleComponent } from './operator-example/operator-example.component';
import { HotExampleComponent } from './hot-example/hot-example.component';
import { SubjectExampleComponent } from './subject-example/subject-example.component';
import { MultipleExampleComponent } from './multiple/example.component';
import { HighOrderExampleComponent } from './high-order/example.component';
import { HighOrderMapExampleComponent } from './high-order-map/example.component';
import { ErrorHandleExampleComponent } from './error-handle/example.component';

export const COMPONENT_PROVIDERS = [
  NoContentComponent,
  MonitorControlComponent,
  ObservableMonitorComponent,
  ObservableExampleComponent,
  OperatorExampleComponent,
  HotExampleComponent,
  SubjectExampleComponent,
  MultipleExampleComponent,
  HighOrderExampleComponent,
  HighOrderMapExampleComponent,
  ErrorHandleExampleComponent,
  NavigationComponent,
];
