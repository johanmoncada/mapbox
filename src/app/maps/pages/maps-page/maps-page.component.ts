import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-maps-page',
  templateUrl: './maps-page.component.html',
  styleUrls: ['./maps-page.component.css']
})
export class MapsPageComponent {

  constructor(
    private _placesService: PlacesService
  ) {}

  get isUserLocationReady() {
    return this._placesService.isUserLocationReady;
  }
  ngOnInit(): void {
  }
}
