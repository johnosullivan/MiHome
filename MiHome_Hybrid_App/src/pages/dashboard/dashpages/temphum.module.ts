import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TempHumidityPage } from './temphum';

@NgModule({
  declarations: [
    TempHumidityPage,
  ],
  imports: [
    IonicPageModule.forChild(TempHumidityPage),
  ],
})
export class TempHumPageModule {}
