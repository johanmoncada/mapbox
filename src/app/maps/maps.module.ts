import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapsPageComponent } from './pages/maps-page/maps-page.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MapViewComponent } from './components/map-view/map-view.component';
import { BtnMyLocationComponent } from './components/btn-my-location/btn-my-location.component';
import { AngularLogoComponent } from './components/angular-logo/angular-logo.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchResultComponent } from './components/search-result/search-result.component';



@NgModule({
  declarations: [
    MapsPageComponent,
    LoadingComponent,
    MapViewComponent,
    BtnMyLocationComponent,
    AngularLogoComponent,
    SearchBarComponent,
    SearchResultComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MapsPageComponent
  ]
})
export class MapsModule { }
