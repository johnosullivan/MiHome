import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-devices',
  templateUrl: 'devices.html',
})
export class DevicesPage {
  date:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.date = Date();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DevicesPage');
  }

}
