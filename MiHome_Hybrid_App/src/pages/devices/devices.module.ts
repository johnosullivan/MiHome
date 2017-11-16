import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DevicesPage } from './devices';

@NgModule({
  declarations: [
    DevicesPage,
  ],
  imports: [
    IonicPageModule.forChild(DevicesPage),
  ],
})
export class DevicesPageModule {}
