import { Component} from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';

declare var cordova;
//https://github.com/ionic-team/ionic-native/issues/525
//allow custom plugin to work with Ionic

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

   title:any;

   constructor(public navCtrl: NavController, public modalCtrl: ModalController, private platform: Platform) {
    this.title = "Welcome";
   }

   showToast(message, position) {
    console.log("Inside show toast in home");
    this.platform.ready().then(() => {
        cordova.plugins.MiHomePlugin.coolMethod(message, "short", position);
    });
}
   

   openLogin() {
     let loginModal = this.modalCtrl.create(LoginPage);
     loginModal.present();
   }

   openReg(){
     let regModal = this.modalCtrl.create(RegisterPage);
     regModal.present();
   }


   ionViewDidLoad() {
    //was previously a commented out chart
     }


}
