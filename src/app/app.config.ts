import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { PreloadAllModules, provideRouter, withComponentInputBinding, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors, withXhr } from '@angular/common/http';
import { authInterceptor } from './core/auth.interceptor';
import { PreloadStrategy } from './core/preload-strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, 
      withComponentInputBinding(),
      withPreloading(PreloadStrategy)
    ),
    provideHttpClient(withXhr(), withInterceptors([authInterceptor])),
  ],
};
