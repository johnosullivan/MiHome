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

averages: Array<{title: string, avg: any}>;

  constructor(
      public alertCtrl: AlertController,
      public viewController:ViewController,
        public navCtrl: NavController, 
        public navParams: NavParams, 
        public sensorData: Storage) {

        this.averages = [
                { title: 'Average Temp', avg: null },
                { title: 'Average Humidity', avg: null },
              ];
  }

  @ViewChild('temphum') temphumCanvas;
  temphum: any;


  ionViewDidLoad() {
    var self = this;
    //chardata(start, end)
    this.sensorData.get('lastcall').then((fakeData) => {
          var d = fakeData['data'];
          var t = _.map(d, 'temperature');
        
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
        var t = _.map(d, 'temperature');
        var h = _.map(d, 'humidity');
        var avg_temp = _.meanBy(d, 'temperature');
        this.averages[0].avg = avg_temp;
        var avg_humidity = _.meanBy(d, 'humidity');
        this.averages[1].avg = avg_humidity;

       
        
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
            });
            
        }
        

  closeModal() { this.navCtrl.pop(); }


}
