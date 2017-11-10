import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  payload:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.payload = {}
  }

  ionViewDidLoad() {

  }

  closeModal() {
    this.navCtrl.pop();
  }

  register() {
    console.log(this.payload);
  }

}
