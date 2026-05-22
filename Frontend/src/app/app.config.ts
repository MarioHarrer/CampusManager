import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import {
  AutoRefreshTokenService,
  INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG, provideKeycloak, UserActivityService, withAutoRefreshToken
} from 'keycloak-angular';
import {config} from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideKeycloak({
      config:{
        url: 'http://localhost:8081/',
        realm: 'htl',
        clientId:'todo_fe',
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/silent-check-sso.html'
      },

      features: [
        withAutoRefreshToken({
            onInactivityTimeout: 'none',
          }
        )
      ],
      providers: [
        AutoRefreshTokenService,
        UserActivityService,
        {
          provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
          useValue: [{
            urlPattern: /^(.+)$/,
            bearerPrefix: 'Bearer'
          }]
        }
      ]
    }),
  ],
};
