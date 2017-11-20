import { Component,ViewChild, ElementRef } from '@angular/core';
import { Nav, IonicPage, NavController, NavParams,ViewController,ModalController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as _ from 'lodash';
import * as HighCharts from 'highcharts';

@Component({
  selector: 'page-temphum',
  templateUrl: 'temphum.html',
})
export class TempHumidityPage {

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
                { title: 'Your Average Temp', avg: this.avged_data[0] + "°C" },
                { title: 'Your Average Humidity', avg: this.avged_data[1] + "%" },
              ];
  }

  @ViewChild('temphum') temphumCanvas;
  temphum: any;

  @ViewChild('idealtemp') idealtempCanvas;
  idealtemp: any;


  ionViewDidLoad() {
    var self = this;
    //chardata(start, end)
    let t = this.sensordata[0];
    let h = this.sensordata[1];
   
       
        
        self.temphum = new Chart(self.temphumCanvas.nativeElement, {
//CHART 1   
                type: 'line',
                data: {
                  labels: this.parsed_date,
                    datasets: [
                        {
                            label: "Temperature",
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
                            data: t,
                            spanGaps: false,
                        },
                        {
                            label: "Humidity",
                            fill: false,
                            lineTension: 0.3,
                            backgroundColor: "#37d6c6",
                            borderColor: "#37d6c6",
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'bevel',
                            pointBorderColor: "#37d6c6",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgba(75,192,192,1)",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointHoverBorderWidth: 2,
                            pointRadius: 3,
                            pointHitRadius: 10,
                            data: h,
                            spanGaps: false,
                        }
                    ]
                }
                
            })

            };
        

  closeModal() { this.navCtrl.pop(); }


}
