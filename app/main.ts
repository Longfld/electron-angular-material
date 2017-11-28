import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

import 'rxjs/Rx';
import 'hammerjs/hammer';

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
