import { Component,ViewChild, ElementRef } from '@angular/core';
import { Nav, IonicPage, NavController, NavParams,ViewController,ModalController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as _ from 'lodash';

@Component({
  selector: 'page-IRLight',
  templateUrl: 'IRLight.html',
})
export class IRLightPage {

  constructor(
      public alertCtrl: AlertController,
      public viewController:ViewController,
        public navCtrl: NavController, 
        public navParams: NavParams, 
        public sensorData: Storage) {
    //what to do here?
  }

  @ViewChild('IRLight') IRLightCanvas;
  IRLight: any;


  ionViewDidLoad() {
    //this.storeSensorData();
    //data stored on previous page
    var self = this;
    //chardata(start, end)
    this.sensorData.get('lastcall').then((fakeData) => {
        var d = fakeData['data'];
        //this doesn't track the time!
        var data_times = _.map(d, 'datetime');
        var parsed_date = [];
        for(let i = 0; i < data_times.length; i++){
            var date = new Date(data_times[i]);
            var year = date.getFullYear();
            var day = date.getDate();
            //formatted as YY/MM/DD
            var locale = 'en-us';
            var month = date.toLocaleString(locale, { month : "short" })
            var parsed = (day + ' ' + month + ' ' + year);
            parsed_date.push(parsed);
        }
        var IR = _.map(d, 'IR');
        var Light = _.map(d, 'light');
        var avg_ir = _.meanBy(d, 'IR');
        var avg_light = _.meanBy(d, 'light');

        self.IRLight = new Chart(self.IRLightCanvas.nativeElement, {
                type: 'line',
                data: {
                  labels: parsed_date,
                    datasets: [
                        {
                            label: "IR",
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
                            data: IR,
                            spanGaps: false,
                        },
                        {
                            label: "Light",
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
                            data: Light,
                            spanGaps: false,
                        }
                    ]
                }
                
            })
            });
            
        }
        

  closeModal() { this.navCtrl.pop(); }


}