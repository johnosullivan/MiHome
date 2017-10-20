import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(public userServiceProvider:UserServiceProvider,public authServiceProvider:AuthServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() { }

  test() {
    var self = this;
    this.userServiceProvider.removeToken().then(function(token){
      self.authServiceProvider.setAuth(false);
      self.navCtrl.setRoot(HomePage);
    });
  }


}