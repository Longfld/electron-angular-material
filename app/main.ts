import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import 'hammerjs/hammer';

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
