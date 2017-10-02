import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(public authServiceProvider:AuthServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() { }

  test() {
    this.authServiceProvider.setAuth(false);
    this.navCtrl.setRoot(HomePage);
  }


}
