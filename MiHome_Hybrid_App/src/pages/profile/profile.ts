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

  user:any;
  constructor(public userServiceProvider:UserServiceProvider,public authServiceProvider:AuthServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.user = {};
    this.userServiceProvider.getUser().then((user) => {
      this.user = user;
    });

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
