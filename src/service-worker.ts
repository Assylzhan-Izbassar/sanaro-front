import { registerRoute, NavigationRoute } from '@angular/service-worker/config';
import { RouteHandler } from '@angular/service-worker/interfaces';
import { SWManifest } from '@angular/service-worker/config';

const manifest: SWManifest = {
  navigationUrls: ['index.html', '/'],
  assetGroups: [
    {
      name: 'assets',
      installMode: 'prefetch',
      resources: {
        files: ['/favicon.ico', '/assets/**'],
      },
    },
  ],
};

registerRoute(
  new NavigationRoute(new RegExp('/.*'), () => {
    return { state: { mode: 'navigate' } };
  })
);

registerRoute(new RegExp('assets/'), new CacheFirst());
