import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data-service/data-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { SetupPage } from '../setup/setup';

@Component({
  selector: 'page-devices',
  templateUrl: 'devices.html',
})
export class DevicesPage {

  date:any;
  devices:any;

  constructor(public userServiceProvider:UserServiceProvider,public dataProvider:DataProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.date = Date();
    this.devices = [];
  }

  add() {
    this.navCtrl.push(SetupPage,{});
  }

  ionViewWillEnter() {
    this.userServiceProvider.getUser().then((user) => {
      this.userServiceProvider.getToken().then((token) => {
        this.dataProvider.devices(user['id'],token).subscribe(
          data => {
            console.log(data);
            if (data.success) {
              this.devices = data['data'];
            }
          },
          err => {
            console.log(JSON.stringify(err));
          }
        );
      });
    });
  }

  ionViewDidLoad() {

  }


}
