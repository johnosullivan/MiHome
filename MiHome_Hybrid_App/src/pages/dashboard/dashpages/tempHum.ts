import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
@Component({
  selector: 'page-temphum',
  templateUrl: 'temphum.html',
})
export class TempHumidityPage {

  constructor(public alertCtrl: AlertController,public viewController:ViewController,
    public navCtrl: NavController, public navParams: NavParams,) {
    //stuff
  }

  ionViewDidLoad() { }

  closeModal() { this.navCtrl.pop(); }

  login() {
      //stuff
  }

}
