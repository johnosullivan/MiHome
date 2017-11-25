import { Component, ViewChild} from '@angular/core';
import { NavController, NavParams,ViewController} from 'ionic-angular';
import { Chart } from 'chart.js';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-co2voc',
  templateUrl: 'co2voc.html',
})
export class CO2VOCPage {

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
                    { title: 'Your Average CO2', avg: this.avged_data[2] + " ppm" },
                    { title: 'Your Average VOC count', avg: this.avged_data[3] + " plain count" },
                  ];
  }

  @ViewChild('co2voc') co2vocCanvas;
  co2voc: any;

  @ViewChild('ideallevels') idealcanvas;
  ideallevels: any;

  ionViewDidLoad() {
      var self = this;
      let co2 = this.sensordata[2];
      let voc = this.sensordata[3];

        self.co2voc = new Chart(self.co2vocCanvas.nativeElement, {
                type: 'line',
                data: {
                  labels: this.parsed_date,
                    datasets: [
                        {
                            label: "CO2",
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
                            data: co2,
                            spanGaps: false,
                        },
                        {
                            label: "VOC",
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
                            data: voc,
                            spanGaps: false,
                        }
                    ]
                }
                
            })
            
        };
        

  closeModal() { this.navCtrl.pop(); }


}
