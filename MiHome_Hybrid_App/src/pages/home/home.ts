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

  /*@ViewChild('barCanvas') barCanvas;

   barChart: any;


   @ViewChild('barCanvas1') barCanvas1;

    barChart1: any;*/

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

    /*   this.barChart = new Chart(this.barCanvas.nativeElement, {

           type: 'bar',
           data: {
               labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
               datasets: [{
                   label: '# of Votes',
                   data: [12, 19, 3, 5, 2, 3],
                   backgroundColor: [
                       'rgba(255, 99, 132, 0.2)',
                       'rgba(54, 162, 235, 0.2)',
                       'rgba(255, 206, 86, 0.2)',
                       'rgba(75, 192, 192, 0.2)',
                       'rgba(153, 102, 255, 0.2)',
                       'rgba(255, 159, 64, 0.2)'
                   ],
                   borderColor: [
                       'rgba(255,99,132,1)',
                       'rgba(54, 162, 235, 1)',
                       'rgba(255, 206, 86, 1)',
                       'rgba(75, 192, 192, 1)',
                       'rgba(153, 102, 255, 1)',
                       'rgba(255, 159, 64, 1)'
                   ],
                   borderWidth: 1
               }]
           },
           options: {
               scales: {
                   yAxes: [{
                       ticks: {
                           beginAtZero:true
                       }
                   }]
               }
           }

       });


       this.barChart1 = new Chart(this.barCanvas1.nativeElement, {

           type: 'line',
           data: {
               labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
               datasets: [{
                   label: '# of Votes',
                   data: [12, 19, 3, 5, 2, 3],
                   backgroundColor: [
                       'rgba(255, 99, 132, 0.2)',
                       'rgba(54, 162, 235, 0.2)',
                       'rgba(255, 206, 86, 0.2)',
                       'rgba(75, 192, 192, 0.2)',
                       'rgba(153, 102, 255, 0.2)',
                       'rgba(255, 159, 64, 0.2)'
                   ],
                   borderColor: [
                       'rgba(255,99,132,1)',
                       'rgba(54, 162, 235, 1)',
                       'rgba(255, 206, 86, 1)',
                       'rgba(75, 192, 192, 1)',
                       'rgba(153, 102, 255, 1)',
                       'rgba(255, 159, 64, 1)'
                   ],
                   borderWidth: 1
               }]
           },
           options: {
               scales: {
                   yAxes: [{
                       ticks: {
                           beginAtZero:true
                       }
                   }]
               }
           }

       });*/

     }


}
