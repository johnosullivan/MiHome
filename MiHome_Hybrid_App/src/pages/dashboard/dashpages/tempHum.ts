import { Component,ViewChild, ElementRef } from '@angular/core';
import { Nav, IonicPage, NavController, NavParams,ViewController,ModalController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as _ from 'lodash';

@Component({
  selector: 'page-temphum',
  templateUrl: 'temphum.html',
})
export class TempHumidityPage {

  constructor(
      public alertCtrl: AlertController,
      public viewController:ViewController,
        public navCtrl: NavController, 
        public navParams: NavParams, 
        public sensorData: Storage) {
    //what to do here?
  }

  @ViewChild('temphum') temphumCanvas;
  temphum: any;

  ionViewDidLoad() {
    //this.storeSensorData();
    //data stored on previous page
    var self = this;
    //chardata(start, end)
    this.sensorData.get('lastcall').then((fakeData) => {
          console.log('Your json is', fakeData);
          var d = fakeData['data'];
          var t = _.map(d, 'temperature');
          console.log("Temperatures being stored!");
          console.log(t);
        
 
        var t = _.map(d, 'temperature');
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
        var h = _.map(d, 'humidity');
        
        self.temphum = new Chart(self.temphumCanvas.nativeElement, {
//CHART 1
                type: 'line',
                data: {
                  labels: parsed_date,
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
                            borderJoinStyle: 'miter',
                            pointBorderColor: "#5285dd",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgba(75,192,192,1)",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
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
                            borderJoinStyle: 'miter',
                            pointBorderColor: "#37d6c6",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgba(75,192,192,1)",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: h,
                            spanGaps: false,
                        }
                    ]
                }
                
            })
            });
            
        }
        

  closeModal() { this.navCtrl.pop(); }


}
