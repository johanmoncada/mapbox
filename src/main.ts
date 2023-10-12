import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from '@appMapbox/app.module';
import { enableProdMode } from "@angular/core";
import { environment } from "@envMapbox/environment";
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1Ijoiam9oYW5tb25jYWRhIiwiYSI6ImNsbjR0c2tneDAzMDAycXFzNmY1NDB5Zm0ifQ.q3rE5v3tYjvh0-I640pTJQ';

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));
if (!navigator.geolocation) {
  alert('Navegador no soporta la Geolocation');
  throw new Error('Navegador no soporta la Geolocation');
}
