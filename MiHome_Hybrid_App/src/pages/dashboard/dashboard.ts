import { Component ,ViewChild, ElementRef } from '@angular/core';
import { Nav, IonicPage, NavController, NavParams,ViewController,ModalController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { Chart } from 'chart.js';
//import { DatePicker } from 'ionic2-date-picker';
import { DatePicker } from '@ionic-native/date-picker';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { SetupPage } from '../setup/setup';

import { DataProvider } from '../../providers/data-service/data-service';
import * as _ from 'lodash';
//@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  providers:[ DatePicker ]
})
export class DashboardPage {
  @ViewChild(Nav) nav: Nav;

  @ViewChild('temphun') temphunCanvas;
  temphun: any;

  @ViewChild('co2voc') co2vocCanvas;
  co2voc: any;

  @ViewChild('pressureUV') pressureUVCanvas;
  pressureUV: any;

  @ViewChild('IRlight') IRlightCanvas;
  IRlight: any;

  start:Date;
  end:Date;

  constructor(public dataProvider:DataProvider,public toastCtrl: ToastController,public alertCtrl: AlertController,private datePicker: DatePicker,public viewController:ViewController,public modalCtrl: ModalController,public navCtrl: NavController, public navParams: NavParams,public userServiceProvider:UserServiceProvider) {

    //this.datePicker = new DatePicker(<any>this.modalCtrl, <any>this.viewController);
    //this.datePicker.onDateSelected.subscribe((date) => { console.log(date); });
    let toaststart = this.toastCtrl.create({
      message: 'WARNING: Some of your sensors went offline :/ You can still access historical data, but you will like to contiune to receive the most current data, please go to settings and reconfigure your nodes. Please tap settings to resolve this issue.',
      showCloseButton: true,
      closeButtonText: 'Setup'
    });
    //toaststart.onDidDismiss(this.dismissHandler);
    //toaststart.present();
  }

  getData() {
    console.log(this.start);
    console.log(this.end)
  }

  dismissHandler() {
    console.info('Toast onDidDismiss()');
    //this.nav.setRoot(SetupPage);
  }

  clock() {

    let toaststart = this.toastCtrl.create({
      message: 'Please select start date/time', position: 'middle'
    });
    //toaststart.present();
    // Start date and time
    this.datePicker.show({
        date: new Date(),
        mode: 'datetime',
        androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
        date => {
          //toaststart.dismiss();
          this.start = date;
          var self = this;
          setTimeout(function() {
            let toastend = self.toastCtrl.create({
              message: 'Please select end date/time',position: 'middle'
            });
            //toastend.present();
            // End date and time
            self.datePicker.show({
                date: new Date(),
                mode: 'datetime',
                androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
            }).then(
                date => {
                  //toastend.dismiss();
                  self.end = date;
                  self.getData();
                },
                err => console.log('', err)
            );
          }, 1000)
        },
        err => console.log('', err)
    );


  }

  ionViewDidLoad() {
    var self = this;
    this.dataProvider.chartdata("","").subscribe(
      data => {
        var d = data['data'];
        var t = _.map(d, 'temperature');
        var h = _.map(d, 'humidity');
        self.temphun = new Chart(self.temphunCanvas.nativeElement, {

                type: 'line',
                data: {
                    labels: ["January", "February", "March", "April", "May", "June", "July"],
                    datasets: [
                        {
                            label: "Temperature",
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: "#6977c6",
                            borderColor: "#6977c6",
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: "#6977c6",
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
                            lineTension: 0.1,
                            backgroundColor: "rgba(75,192,192,1)",
                            borderColor: "rgba(75,192,192,1)",
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: "rgba(75,192,192,1)",
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

            });


            var c = _.map(d, 'co2');
            var v = _.map(d, 'voc');

            self.co2voc = new Chart(self.co2vocCanvas.nativeElement, {

                    type: 'line',
                    data: {
                        labels: ["January", "February", "March", "April", "May", "June", "July"],
                        datasets: [
                            {
                                label: "CO2",
                                fill: false,
                                lineTension: 0.1,
                                backgroundColor: "#6977c6",
                                borderColor: "#6977c6",
                                borderCapStyle: 'butt',
                                borderDash: [],
                                borderDashOffset: 0.0,
                                borderJoinStyle: 'miter',
                                pointBorderColor: "#6977c6",
                                pointBackgroundColor: "#fff",
                                pointBorderWidth: 1,
                                pointHoverRadius: 5,
                                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                                pointHoverBorderColor: "rgba(220,220,220,1)",
                                pointHoverBorderWidth: 2,
                                pointRadius: 1,
                                pointHitRadius: 10,
                                data: c,
                                spanGaps: false,
                            },
                            {
                                label: "VOC",
                                fill: false,
                                lineTension: 0.1,
                                backgroundColor: "rgba(75,192,192,1)",
                                borderColor: "rgba(75,192,192,1)",
                                borderCapStyle: 'butt',
                                borderDash: [],
                                borderDashOffset: 0.0,
                                borderJoinStyle: 'miter',
                                pointBorderColor: "rgba(75,192,192,1)",
                                pointBackgroundColor: "#fff",
                                pointBorderWidth: 1,
                                pointHoverRadius: 5,
                                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                                pointHoverBorderColor: "rgba(220,220,220,1)",
                                pointHoverBorderWidth: 2,
                                pointRadius: 1,
                                pointHitRadius: 10,
                                data: v,
                                spanGaps: false,
                            }
                        ]
                    }

                });

                var p = _.map(d, 'pressure');
                var UV = _.map(d, 'UV');


                self.pressureUV = new Chart(self.pressureUVCanvas.nativeElement, {

                        type: 'line',
                        data: {
                            labels: ["January", "February", "March", "April", "May", "June", "July"],
                            datasets: [
                                {
                                    label: "Pressure",
                                    fill: false,
                                    lineTension: 0.1,
                                    backgroundColor: "#6977c6",
                                    borderColor: "#6977c6",
                                    borderCapStyle: 'butt',
                                    borderDash: [],
                                    borderDashOffset: 0.0,
                                    borderJoinStyle: 'miter',
                                    pointBorderColor: "#6977c6",
                                    pointBackgroundColor: "#fff",
                                    pointBorderWidth: 1,
                                    pointHoverRadius: 5,
                                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                                    pointHoverBorderColor: "rgba(220,220,220,1)",
                                    pointHoverBorderWidth: 2,
                                    pointRadius: 1,
                                    pointHitRadius: 10,
                                    data: p,
                                    spanGaps: false,
                                },
                                {
                                    label: "UV",
                                    fill: false,
                                    lineTension: 0.1,
                                    backgroundColor: "rgba(75,192,192,1)",
                                    borderColor: "rgba(75,192,192,1)",
                                    borderCapStyle: 'butt',
                                    borderDash: [],
                                    borderDashOffset: 0.0,
                                    borderJoinStyle: 'miter',
                                    pointBorderColor: "rgba(75,192,192,1)",
                                    pointBackgroundColor: "#fff",
                                    pointBorderWidth: 1,
                                    pointHoverRadius: 5,
                                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                                    pointHoverBorderColor: "rgba(220,220,220,1)",
                                    pointHoverBorderWidth: 2,
                                    pointRadius: 1,
                                    pointHitRadius: 10,
                                    data: UV,
                                    spanGaps: false,
                                }
                            ]
                        }

                    });

                    var ir = _.map(d, 'IR');
                    var light = _.map(d, 'light');

                    self.IRlight = new Chart(self.IRlightCanvas.nativeElement, {

                            type: 'line',
                            data: {
                                labels: ["January", "February", "March", "April", "May", "June", "July"],
                                datasets: [
                                    {
                                        label: "Light",
                                        fill: false,
                                        lineTension: 0.1,
                                        backgroundColor: "#6977c6",
                                        borderColor: "#6977c6",
                                        borderCapStyle: 'butt',
                                        borderDash: [],
                                        borderDashOffset: 0.0,
                                        borderJoinStyle: 'miter',
                                        pointBorderColor: "#6977c6",
                                        pointBackgroundColor: "#fff",
                                        pointBorderWidth: 1,
                                        pointHoverRadius: 5,
                                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                                        pointHoverBorderColor: "rgba(220,220,220,1)",
                                        pointHoverBorderWidth: 2,
                                        pointRadius: 1,
                                        pointHitRadius: 10,
                                        data: light,
                                        spanGaps: false,
                                    },
                                    {
                                        label: "IR",
                                        fill: false,
                                        lineTension: 0.1,
                                        backgroundColor: "rgba(75,192,192,1)",
                                        borderColor: "rgba(75,192,192,1)",
                                        borderCapStyle: 'butt',
                                        borderDash: [],
                                        borderDashOffset: 0.0,
                                        borderJoinStyle: 'miter',
                                        pointBorderColor: "rgba(75,192,192,1)",
                                        pointBackgroundColor: "#fff",
                                        pointBorderWidth: 1,
                                        pointHoverRadius: 5,
                                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                                        pointHoverBorderColor: "rgba(220,220,220,1)",
                                        pointHoverBorderWidth: 2,
                                        pointRadius: 1,
                                        pointHitRadius: 10,
                                        data: ir,
                                        spanGaps: false,
                                    }
                                ]
                            }

                        });
      },
      err => console.log(err),
      () => console.log('')
    );














  }

  test() {
    var token = this.userServiceProvider.getToken().then((token) => {
      console.log(token);
    });
  }

}
