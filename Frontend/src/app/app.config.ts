import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  HttpHandlerFn,
  HttpRequest,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  AutoRefreshTokenService,
  INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
  includeBearerTokenInterceptor,
  provideKeycloak,
  UserActivityService,
  withAutoRefreshToken,
} from 'keycloak-angular';
import { BASE_PATH } from './api';

// Basis-URL des NestJS-Backends. WICHTIG: ohne Trailing-Slash, weil die
// generierten OpenAPI-Services Pfade als `${basePath}/todos` zusammenbauen.
const BACKEND_URL = 'http://localhost:3000';

/**
 * Verhindert dass der Browser/Angular gecachte Antworten (304 Not Modified)
 * verwendet, was bei den generierten OpenAPI-Services dazu führt, dass
 * Folge-Requests leer im Frontend ankommen. Wir setzen Cache-Header explizit
 * auf "no-cache" — und hängen einen Cache-Buster-Query-Param an GETs an, damit
 * die URL für den Browser-Cache immer neu wirkt.
 */
function noCacheInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  if (!req.url.startsWith(BACKEND_URL)) {
    return next(req);
  }
  const cloned = req.clone({
    setHeaders: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    },
    params: req.method === 'GET'
      ? req.params.set('_', Date.now().toString())
      : req.params,
  });
  return next(cloned);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([noCacheInterceptor, includeBearerTokenInterceptor]),
    ),
    {
      provide: BASE_PATH,
      useValue: BACKEND_URL,
    },
    provideKeycloak({
      config: {
        url: 'http://localhost:8081/',
        realm: 'htl',
        clientId: 'todo_fe',
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/silent-check-sso.html',
      },

      features: [
        withAutoRefreshToken({
          onInactivityTimeout: 'none',
        }),
      ],
      providers: [
        AutoRefreshTokenService,
        UserActivityService,
        {
          provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
          useValue: [
            {
              // Bearer-Token nur an das eigene Backend hängen — NICHT an
              // externe APIs wie Open-Meteo (Wetter), sonst werden die
              // Requests dort als ungültig zurückgewiesen.
              urlPattern: new RegExp('^' + escapeRegExp(BACKEND_URL) + '(/|$)'),
              bearerPrefix: 'Bearer',
            },
          ],
        },
      ],
    }),
  ],
};

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
