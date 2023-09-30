import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places';
import { environment } from '@envMapbox/environment';
import { MapsService } from './maps.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {


  userLocation?: [number, number];
  isLoadingPlaces: boolean = false;
  places: Feature[] = [];

  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  constructor(
    private _http: HttpClient,
    private _mapsServices: MapsService
  ) {
    this.getUserLocation();
  }

  async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation = [coords.longitude, coords.latitude];
          resolve(this.userLocation);
        },
        (err) => {
          alert('No se pudo obtner la geolocalizacion');
          console.log(err);
          reject();
        }
      );
    });
  }

  getPlacesByQuery(query: string = '') {
    if (query.length === 0) {
      this.places = [];
      this.isLoadingPlaces = false;
      return;
    }
    
    if (!this.userLocation) throw Error('No hay userLocation');

    this.isLoadingPlaces = true;

    const params: HttpParams = 
      new HttpParams()
        .set('access_token', environment.api.mapbox.access_token)
        .set('languaje', environment.api.mapbox.languaje)
        .set('country', environment.api.mapbox.country)
        .set('routing', environment.api.mapbox.routing)
        .set('limit', environment.api.mapbox.limit)
        .set('proximity', this.userLocation.join(','));

    const url = [environment.api.mapbox.url, `${query}.json`].join('/');

    this._http.get<PlacesResponse>(url, { params })
      .subscribe(resp => {
        this.isLoadingPlaces = false;
        this.places = resp.features;

        this._mapsServices.createMarkersFromPlaces(this.places);
      });
  }
}
