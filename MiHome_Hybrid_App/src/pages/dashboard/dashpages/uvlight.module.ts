import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UVLightPage } from './uvlight';

@NgModule({
  declarations: [
    UVLightPage,
  ],
  imports: [
    IonicPageModule.forChild(UVLightPage),
  ],
})
export class TempHumPageModule {}
