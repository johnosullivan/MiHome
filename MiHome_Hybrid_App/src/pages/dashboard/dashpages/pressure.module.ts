import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PressurePage } from './pressure';

@NgModule({
  declarations: [
    PressurePage,
  ],
  imports: [
    IonicPageModule.forChild(PressurePage),
  ],
})
export class PressureModule {}
