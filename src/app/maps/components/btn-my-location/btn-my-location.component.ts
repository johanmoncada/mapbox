import { Component } from '@angular/core';
import { MapsService, PlacesService } from '@appMapbox/maps/services';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.css']
})
export class BtnMyLocationComponent {

  constructor(
    private _mapsServices: MapsService,
    private _placesServices: PlacesService
  ) {}

  goToMyLocation() {
    if (!this._placesServices.isUserLocationReady) throw Error('No hay ubicación de usuario');
    if (!this._mapsServices.isMapReady) throw Error('No hay mapa disponible');

    this._mapsServices.flyTo(this._placesServices.userLocation!);
  }
}
