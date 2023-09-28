import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from '@appMapbox/app.module';
import { enableProdMode } from "@angular/core";
import { environment } from "@envMapbox/environment";

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
