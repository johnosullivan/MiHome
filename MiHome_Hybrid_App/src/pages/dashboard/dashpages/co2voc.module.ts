import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CO2VOCPage } from './co2voc';

@NgModule({
  declarations: [
    CO2VOCPage,
  ],
  imports: [
    IonicPageModule.forChild(CO2VOCPage),
  ],
})
export class CO2VOCModule {}
