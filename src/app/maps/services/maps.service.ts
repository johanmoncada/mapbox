import { Injectable } from '@angular/core';
import { AnySourceData, LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { Feature } from '@appMapbox/maps/interfaces/places';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@envMapbox/environment';
import { DirectionsResponse, Route } from '@appMapbox/maps/interfaces/directions';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  private map?: Map;
  private markers: Marker[] = [];

  get isMapReady() {
    return !!this.map;
  }

  constructor(
    private _http: HttpClient
  ) {}

  setMap(map: Map) {
    this.map = map;
  }

  flyTo(coords: LngLatLike) {
    if (!this.isMapReady) throw Error('El mapa no esta inicializado');

    this.map?.flyTo({
      zoom: 14,
      center: coords
    })
  }

  createMarkersFromPlaces(places: Feature[], userLocation: [number, number]) {
    if (!this.map) throw Error('Mapa no inicializado');

    this.markers.forEach(marker => marker.remove());
    const newMarkers = [];

    for (const place of places) {
      const [lng, lat] = place.center;
      const popup = new Popup()
        .setHTML(`
          <h6>${ place.text_es }</h6>
          <span>${ place.place_name_es }</span>
        `);

        const newMarker = new Marker()
          .setLngLat([lng, lat])
          .setPopup(popup)
          .addTo(this.map);

        newMarkers.push(newMarker); 
    }

    this.markers = newMarkers;

    if (places.length == 0) return;

    //Limites del mapa
    const bounds = new LngLatBounds();
    bounds.extend(userLocation);
    newMarkers.forEach(marker => bounds.extend(marker.getLngLat()));

    this.map.fitBounds(bounds, {
      padding: 200
    });
  }

  getRouteBetweenPoints(start: [number, number], end: [number, number]) {
    const params: HttpParams = 
      new HttpParams()
        .set('alternatives', environment.api.mapbox.directions.alternatives)
        .set('geometries', environment.api.mapbox.directions.geometries)
        .set('overview', environment.api.mapbox.directions.overview)
        .set('steps', environment.api.mapbox.directions.steps)
        .set('notifications', environment.api.mapbox.directions.notifications)
        .set('access_token', environment.api.mapbox.access_token);

    const start_end = [start.join(','), end.join(',')].join(';');
    const url = [environment.api.mapbox.directions.url, start_end].join('/');

    this._http.get<DirectionsResponse>(url, { params }).subscribe(
      resp => this.drawPolyline(resp.routes[0])
    );
  }

  private drawPolyline(route: Route) {
    if (!this.map) throw Error('Mapa no inicializado');

    const coords = route.geometry.coordinates;
    const start = coords[0] as [number, number];

    const bounds = new LngLatBounds();
    coords.forEach(([lng, lat]) => {
      bounds.extend([lng, lat]);
    });

    this.map?.fitBounds(bounds, {
      padding: 200
    });

    //Polyline => LineString
    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords
            }
          }
        ]
      }
    }
    
    //Todo: Limpiar ruta previa
    if (this.map.getLayer('RouteString')) {
      this.map.removeLayer('RouteString');
      this.map.removeSource('RouteString');
    }
    
    this.map.addSource('RouteString', sourceData);

    this.map.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color': 'black',
        'line-width': 3
      }
    });
  }
}
