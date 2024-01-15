import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { BasicAuthInterceptorFn } from './interseptors/auth.interseptor';
import { ErrorInterceptorFn } from './interseptors/error.interseptor';
import { BackendInterceptorFn } from './backend/backend';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    importProvidersFrom(HttpClientModule),    
    importProvidersFrom(BrowserAnimationsModule),    

    provideHttpClient(withInterceptors([
      BasicAuthInterceptorFn,
      ErrorInterceptorFn,
      BackendInterceptorFn, // Не забыть вырубить или environment === production => и вырубить
    ]))
  ]
};
