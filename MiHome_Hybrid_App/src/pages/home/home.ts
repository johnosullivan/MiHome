import { Component,ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
//import { Chart } from 'chart.js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

   title:any;

   constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
    this.title = "Welcome";
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
