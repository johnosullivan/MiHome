import { Component ,ViewChild, ElementRef } from '@angular/core';
import { Nav, IonicPage, NavController, NavParams,ViewController,ModalController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { Chart } from 'chart.js';
//import { DatePicker } from 'ionic2-date-picker';
import { DatePicker } from '@ionic-native/date-picker';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { SetupPage } from '../setup/setup';
import { Storage } from '@ionic/storage';

import { DataProvider } from '../../providers/data-service/data-service';
import * as _ from 'lodash';
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

  constructor(public dataProvider:DataProvider,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private datePicker: DatePicker,
    public viewController:ViewController,
    public modalCtrl: ModalController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userServiceProvider:UserServiceProvider,
    public sensorData: Storage
) {

    let toaststart = this.toastCtrl.create({
      message: 'WARNING: Some of your sensors went offline :/ You can still access historical data, but you will like to contiune to receive the most current data, please go to settings and reconfigure your nodes. Please tap settings to resolve this issue.',
      showCloseButton: true,
      closeButtonText: 'Setup'
    });
  }

//hardcoded start/end data
  getData() {
    console.log(this.start);
    console.log(this.end);
  }

  dismissHandler() {
    console.info('Toast onDidDismiss()');
    //this.nav.setRoot(SetupPage);
  }

  storeSensorData(){
      //store sensor data locally so can be referenced by other pages
      //without needing to ping again
     this.dataProvider.chartdata("","").subscribe(
        
              data => {
                var fakeData = 
        
                {
                    "success": true,
                    "size": 1,
                    "data": [
                    {
                     "_id": "59e171fe92f5dc00047f3dbe",
                     "datetime": "2017-10-14T02:10:06.587Z",
                     "temperature": 23.6,
                     "humidity": 61.07,
                     "co2": 679,
                     "voc": 42,
                     "visible": 261,
                     "light": 3,
                     "UV": 0.01,
                     "IR": 255,
                     "pressure": 99539,
                     "nodeID": "00000012340987011",
                     "__v": 0
                    },
                    {
                        "_id": "59e171fe92f5dc00047f3dbf",
                        "datetime": "2017-10-15T02:10:06.587Z",
                        "temperature": 43.6,
                        "humidity": 71.07,
                        "co2": 879,
                        "voc": 12,
                        "visible": 241,
                        "light": 2,
                        "UV": 0.02,
                        "IR": 245,
                        "pressure": 99639,
                        "nodeID": "00000012340987011",
                        "__v": 0
                       },
                       {
                        "_id": "59e171fe92f5dc00047f3dbg",
                        "datetime": "2017-11-14T02:10:06.587Z",
                        "temperature": 25.6,
                        "humidity": 90.07,
                        "co2": 779,
                        "voc": 32,
                        "visible": 271,
                        "light": 3,
                        "UV": 0.01,
                        "IR": 155,
                        "pressure": 89539,
                        "nodeID": "00000012340987011",
                        "__v": 0
                       },
                       {
                        "_id": "59e171fe92f5dc00047f3dbr",
                        "datetime": "2017-11-16T02:10:06.587Z",
                        "temperature": 29.6,
                        "humidity": 69.07,
                        "co2": 629,
                        "voc": 32,
                        "visible": 221,
                        "light": 2,
                        "UV": 0.03,
                        "IR": 285,
                        "pressure": 98539,
                        "nodeID": "00000012340987011",
                        "__v": 0
                       },
                       {
                        "_id": "59e171fe92f5dc00047f3dbl",
                        "datetime": "2017-11-24T02:10:06.587Z",
                        "temperature": 27.6,
                        "humidity": 91.07,
                        "co2": 779,
                        "voc": 32,
                        "visible": 461,
                        "light": 2,
                        "UV": 0.02,
                        "IR": 290,
                        "pressure": 99839,
                        "nodeID": "00000012340987011",
                        "__v": 0
                       }
                    ]
                   }
                   console.log(fakeData);
                   this.sensorData.set("lastcall", fakeData);
                   this.sensorData.get('lastcall').then((fakeData) => {
                    console.log('Your json is', fakeData);
                    var d = fakeData['data'];
                    var t = _.map(d, 'temperature');
                    console.log("Temperatures being stored!");
                    console.log(t);
                  });
                   
                })
            
            
            };


  clock() {

    let toaststart = this.toastCtrl.create({
      message: 'Please select start date/time', position: 'middle'
    });
    //toaststart.present();



    // Start date and time selector
    this.datePicker.show({
        date: new Date(),
        mode: 'datetime',
        androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
        date => {
          this.start = date;
          var self = this;
          setTimeout(function() {
            // End date and time selector
            self.datePicker.show({
                date: new Date(),
                mode: 'datetime',
                androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
            }).then(
                date => {
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


  /* Data looks like this

{
 "success": true,
 "size": 1,
 "data": [
 {
  "_id": "59e171fe92f5dc00047f3dbe",
  "datetime": "2017-10-14T02:10:06.587Z",
  "temperature": 23.6,
  "humidity": 61.07,
  "co2": 679,
  "voc": 42,
  "visible": 261,
  "light": 3,
  "UV": 0.01,
  "IR": 255,
  "pressure": 99539,
  "nodeID": "00000012340987011",
  "__v": 0
 }
 ]
}

    */

  ionViewDidLoad() {
    this.storeSensorData();
    var self = this;
    //chardata(start, end)
    this.dataProvider.chartdata("","").subscribe(

     data => {
        var fakeData = 

        {
            "success": true,
            "size": 1,
            "data": [
            {
             "_id": "59e171fe92f5dc00047f3dbe",
             "datetime": "2017-10-14T02:10:06.587Z",
             "temperature": 23.6,
             "humidity": 61.07,
             "co2": 679,
             "voc": 42,
             "visible": 261,
             "light": 3,
             "UV": 0.01,
             "IR": 255,
             "pressure": 99539,
             "nodeID": "00000012340987011",
             "__v": 0
            },
            {
                "_id": "59e171fe92f5dc00047f3dbf",
                "datetime": "2017-10-15T02:10:06.587Z",
                "temperature": 43.6,
                "humidity": 71.07,
                "co2": 879,
                "voc": 12,
                "visible": 241,
                "light": 2,
                "UV": 0.02,
                "IR": 245,
                "pressure": 99639,
                "nodeID": "00000012340987011",
                "__v": 0
               },
               {
                "_id": "59e171fe92f5dc00047f3dbg",
                "datetime": "2017-11-14T02:10:06.587Z",
                "temperature": 25.6,
                "humidity": 90.07,
                "co2": 779,
                "voc": 32,
                "visible": 271,
                "light": 3,
                "UV": 0.01,
                "IR": 155,
                "pressure": 89539,
                "nodeID": "00000012340987011",
                "__v": 0
               },
               {
                "_id": "59e171fe92f5dc00047f3dbr",
                "datetime": "2017-11-16T02:10:06.587Z",
                "temperature": 29.6,
                "humidity": 69.07,
                "co2": 629,
                "voc": 32,
                "visible": 221,
                "light": 2,
                "UV": 0.03,
                "IR": 285,
                "pressure": 98539,
                "nodeID": "00000012340987011",
                "__v": 0
               },
               {
                "_id": "59e171fe92f5dc00047f3dbl",
                "datetime": "2017-11-24T02:10:06.587Z",
                "temperature": 27.6,
                "humidity": 91.07,
                "co2": 779,
                "voc": 32,
                "visible": 461,
                "light": 2,
                "UV": 0.02,
                "IR": 290,
                "pressure": 99839,
                "nodeID": "00000012340987011",
                "__v": 0
               }
            ]
           }



        var d = fakeData['data'];
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
        self.temphun = new Chart(self.temphunCanvas.nativeElement, {
//CHART 1
                type: 'line',
                data: {
                  labels: parsed_date,
                    datasets: [
                        {
                            label: "Temperature",
                            fill: false,
                            lineTension: 0.3,
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
                            lineTension: 0.3,
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

            //map method, first arg is var d (data) and second method is what
            //you want to get back
            /* From above:
            var d = data['data'];
            var t = _.map(d, 'temperature');
            var h = _.map(d, 'humidity');
            */
            var c = _.map(d, 'co2');
            var v = _.map(d, 'voc');
//CHART 2
            self.co2voc = new Chart(self.co2vocCanvas.nativeElement, {

                    type: 'line',
                    data: {
                        labels: parsed_date,
                        datasets: [
                            {
                                label: "CO2",
                                fill: false,
                                lineTension: 0.3,
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
                                lineTension: 0.3,
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
//CHART 3
                        type: 'line',
                        data: {
                          labels: parsed_date,
                            datasets: [
                                {
                                    label: "Pressure",
                                    fill: false,
                                    lineTension: 0.3,
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
                                    lineTension: 0.3,
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

               //DELETED CHARTS
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
