import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapsPageComponent } from './pages/maps-page/maps-page.component';



@NgModule({
  declarations: [
    MapsPageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MapsPageComponent
  ]
})
export class MapsModule { }
