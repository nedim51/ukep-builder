import { ApplicationConfig, importProvidersFrom, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { BasicAuthInterceptorFn } from './interseptors/auth.interseptor';
import { ErrorInterceptorFn } from './interseptors/error.interseptor';
import { BackendInterceptorFn } from './backend/backend';
import { ThemeService } from './services/root/theme.service';
import { DOCUMENT } from '@angular/common';
import { NgUkepIconsRegistry } from 'ng-ukep-icons';
import { completeIconSet } from 'ng-ukep-icons-builder';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    importProvidersFrom(HttpClientModule),    
    importProvidersFrom(BrowserAnimationsModule),    

    provideHttpClient(withInterceptors([
      BasicAuthInterceptorFn,
      ErrorInterceptorFn,
      BackendInterceptorFn, // Не забыть вырубить или environment === production => и вырубить
    ])),
    { 
      provide: ThemeService, 
      useFactory: () => {
        const document = inject(DOCUMENT);
        const themeService = new ThemeService(document);
        themeService.loadTheme();
        
        return themeService;
      }
    },
    { 
      provide: NgUkepIconsRegistry, 
      useFactory: () => {
        const registry = new NgUkepIconsRegistry();
        registry.registerIcons(completeIconSet)
        
        return registry;
      }
    }
  ]
};
