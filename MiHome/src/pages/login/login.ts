import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  creds:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public authServiceProvider:AuthServiceProvider,public userServiceProvider:UserServiceProvider) {
    this.creds = {};
  }

  ionViewDidLoad() { }

  closeModal() { this.navCtrl.pop(); }

  login() {
    console.log(this.creds);
    this.authServiceProvider.login(this.creds).subscribe(
      data => {
        if (data.success) {
          this.userServiceProvider.saveToken(data.token);
          this.navCtrl.pop();
        } else {

        }
      },
      err => console.log(err),
      () => console.log('Logging in....')
    );
  }

}
