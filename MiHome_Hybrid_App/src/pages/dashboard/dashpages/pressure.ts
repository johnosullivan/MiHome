import { Component,ViewChild, ElementRef } from '@angular/core';
import { Nav, IonicPage, NavController, NavParams,ViewController,ModalController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as _ from 'lodash';

@Component({
  selector: 'page-pressure',
  templateUrl: 'pressure.html',
})



export class PressurePage {

averages: Array<{title: string, avg: any}>;
public parsed_date;
public avged_data;
public sensordata;

  constructor(
      public alertCtrl: AlertController,
      public viewController:ViewController,
        public navCtrl: NavController, 
        public navParams: NavParams, 
        public sensorData: Storage) {
            this.parsed_date = navParams.get("dates");
            this.avged_data = navParams.get("averages");
            this.sensordata = navParams.get("sensor")
            this.averages = [
                    { title: 'Your Average Pressure', avg: this.avged_data[0] + " Pa" },
                  ];
  }

  @ViewChild('pressure') pressureCanvas;
  pressure: any;

  @ViewChild('idealtemp') idealtempCanvas;
  idealtemp: any;


  ionViewDidLoad() {
    var self = this;
    let pressure = this.sensordata[6];

        self.pressure = new Chart(self.pressureCanvas.nativeElement, {
                type: 'line',
                data: {
                  labels: this.parsed_date,
                    datasets: [
                        {
                            label: "Pressure",
                            fill: false,
                            lineTension: 0.3,
                            backgroundColor: "#5285dd",
                            borderColor: "#5285dd",
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'bevel',
                            pointBorderColor: "#5285dd",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgba(75,192,192,1)",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointHoverBorderWidth: 2,
                            pointRadius: 3,
                            pointHitRadius: 10,
                            data: pressure,
                            spanGaps: false,
                        }
                    ]
                }
                
            })
            
        };
        

  closeModal() { this.navCtrl.pop(); }


}