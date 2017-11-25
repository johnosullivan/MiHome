import { Component, ViewChild} from '@angular/core';
import { NavController, NavParams,ViewController} from 'ionic-angular';
import { Chart } from 'chart.js';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-IR',
  templateUrl: 'IR.html',
})
export class IRPage {

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
                    { title: 'Your Average IR Light', avg: this.avged_data[4] + " nm" },
                  ];
  }

  @ViewChild('IR') IRCanvas;
  IR: any;

  @ViewChild('ideallevel') idealCanvas;
  ideallevel: any;

  ionViewDidLoad() {
    var self = this;
    let IR = this.sensordata[4];

        self.IR = new Chart(self.IRCanvas.nativeElement, {
                type: 'line',
                data: {
                  labels: this.parsed_date,
                    datasets: [
                        {
                            label: "Infrared Light",
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
                        }
                    ]
                }
                
            })
            
        };
        
        

  closeModal() { this.navCtrl.pop(); }


}