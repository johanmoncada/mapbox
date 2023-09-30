import { Component } from '@angular/core';
import { Feature } from '@appMapbox/maps/interfaces/places';
import { MapsService, PlacesService } from '@appMapbox/maps/services';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent {

  selectedId: string = '';

  constructor(
    private _placesService: PlacesService,
    private _mapsService: MapsService
  ) {}

  get isLoadingPlaces(): boolean {
    return this._placesService.isLoadingPlaces;
  }

  get places(): Feature[] {
    return this._placesService.places;
  }

  flyTo(place: Feature) {
    this.selectedId = place.id;
    
    const [lng, lat] = place.center;
    this._mapsService.flyTo([lng, lat]);
  }
}
