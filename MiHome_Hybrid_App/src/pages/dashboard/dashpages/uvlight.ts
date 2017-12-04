import { Component, ViewChild} from '@angular/core';
import { NavController, NavParams,ViewController} from 'ionic-angular';
import { Chart } from 'chart.js';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-uvlught',
  templateUrl: 'uvlight.html',
})
export class UVLightPage {

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
                { title: 'Your Average UV', avg: this.avged_data[7] + " nm" },
                { title: 'Your Average Indoor Light', avg: this.avged_data[5] + " lux" },
              ];
  }

  @ViewChild('temphum') temphumCanvas;
  temphum: any;

  @ViewChild('idealtemp') idealtempCanvas;
  idealtemp: any;


  ionViewDidLoad() {
    var self = this;
    //chardata(start, end)
    let uv = this.sensordata[7];
    let light = this.sensordata[5];
   
       
        
        self.temphum = new Chart(self.temphumCanvas.nativeElement, {
//CHART 1   
                type: 'line',
                data: {
                  labels: this.parsed_date,
                    datasets: [
                        {
                            label: "UV",
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
                            data: uv,
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
                            data: light,
                            spanGaps: false,
                        }
                    ]
                }
                
            })

            };
        

  closeModal() { this.navCtrl.pop(); }


}
