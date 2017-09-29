import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public userServiceProvider:UserServiceProvider) {
    
  }

  ionViewDidLoad() { }

  test() {
    var token = this.userServiceProvider.getToken().then((token) => {
      console.log(token);
    });
  }

}
