import { Component, ViewChild} from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
import { Chart } from 'chart.js';
import { WindowRef } from '../../app/WindowRef';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('circleCanvas') circleCanvas;

   title:any;
   circleChart: any;

   constructor(private winRef: WindowRef,public navCtrl: NavController, public modalCtrl: ModalController, private platform: Platform) {
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

   plugintest() {
     console.log("Plugin testing...");
     this.winRef.nativeWindow.MiHomePlugin.echo("echo",function(date) {
       console.log(date);
     });
   }


   ionViewDidLoad() {
    this.circleChart = new Chart(this.circleCanvas.nativeElement, {

                 type: 'doughnut',
                 data: {
                     labels: ["C++", "TypeScript", "HTML", "Arduino", "Javascript", "CSS", "Other"],
                     datasets: [{
                         label: '% of project',
                         data: [48.4, 19.6, 13.4, 10.8, 5.1, 1.3, 1.4],
                         backgroundColor: [
                             'rgba(255, 86, 122, 0.7)',
                             'rgba(57, 125, 204, 0.7)',
                             'rgba(255, 195, 91, 0.7)',
                             'rgba(45, 183, 64, 0.7)',
                             'rgba(95, 100, 135, 0.7)',
                             'rgba(186, 113, 5, 0.7)',
                             'rgba(186, 4, 74, 0.7)'
                         ],
                         hoverBackgroundColor: [
                             "#FF6384",
                             "#36A2EB",
                             "#FFCE56",
                             "#2db740",
                             "#e87aa8",
                             "#5f6487",
                             "#ba7105",
                             "#ba044a"
                         ]
                     }]
                 },
                 options: {
                  tooltips: {
                       enabled: false
                  }
              }

             });
     }


}
