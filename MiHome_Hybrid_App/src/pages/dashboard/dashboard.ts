import { Component ,ViewChild, ElementRef } from '@angular/core';
import { Nav, IonicPage, NavController, NavParams,ViewController,ModalController, Platform } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { Chart } from 'chart.js';
//import { DatePicker } from 'ionic2-date-picker';
import { DatePicker } from '@ionic-native/date-picker';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { SetupPage } from '../setup/setup';
import { Storage } from '@ionic/storage';
import { TempHumidityPage } from './dashpages/tempHum';
import { CO2VOCPage } from './dashpages/co2voc';
import { PressurePage } from './dashpages/pressure';
import { IRPage } from './dashpages/IR';
import { UVLightPage } from './dashpages/uvlight';


import { DataProvider } from '../../providers/data-service/data-service';
import * as _ from 'lodash';
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  providers:[ DatePicker ]
})
export class DashboardPage {
  @ViewChild(Nav) nav: Nav;

  @ViewChild('rightnow') rightNowCard;
  rightnow: any;

  start:Date;
  end:Date;
  rootPage: any = DashboardPage;

  dashpages: Array<{title: string, icon:string, component: any}>;

  public averages;
  public dates;
  public sensordata;


  constructor(public dataProvider:DataProvider,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private datePicker: DatePicker,
    public viewController:ViewController,
    public modalCtrl: ModalController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userServiceProvider:UserServiceProvider,
    public sensorData: Storage,
    public platform: Platform, 
) {

    let toaststart = this.toastCtrl.create({
      message: 'WARNING: Some of your sensors went offline :/ You can still access historical data, but you will like to contiune to receive the most current data, please go to settings and reconfigure your nodes. Please tap settings to resolve this issue.',
      showCloseButton: true,
      closeButtonText: 'Setup'
    });

    this.dashpages = [
        { title: 'Temperature & Humidity', icon:'thermometer', component: TempHumidityPage },
        { title: 'Carbon Dioxide & VOCs', icon:'warning',component: CO2VOCPage },
        { title: 'Pressure', icon: 'cloud-circle', component: PressurePage},
        { title: 'UV & Light', icon:'sunny',component: UVLightPage },
        { title: 'Infrared Light', icon:'contrast',component: IRPage },
      ];
  }

//        { title: 'Pressure & UV', icon: 'sunny', component: PressureUVPage},


//hardcoded start/end data
  getData() {
    console.log(this.start);
    console.log(this.end);
  }

  dismissHandler() {
    console.info('Toast onDidDismiss()');
    //this.nav.setRoot(SetupPage);
  }


  openPage(page) {
   this.navCtrl.push(page.component, {
     averages: this.averages,
     dates: this.dates,
     sensor: this.sensordata
    });
   //push pages cause you want to go back to dash from them
    }

  storeSensorData(){
      //store sensor data locally so can be referenced by other pages
      //without needing to ping again
     this.dataProvider.chartdata("","").subscribe(
        
              data => {
                let fakeData = 
        
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
                  // store the data
                   this.sensorData.set("lastcall", fakeData);
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
          let self = this;
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
    console.log("Data refreshed");
    let self = this;
    //store data when dash loads
    this.sensorData.get('lastcall').then((fakeData) => {
    let d = fakeData['data'];
    //get averages
    let avg_temp = _.meanBy(d, 'temperature');
    let avg_humidity = _.meanBy(d, 'humidity');
    let avg_co2 = _.meanBy(d, 'co2');
    let avg_voc = _.meanBy(d, 'voc');
    let avg_ir = _.meanBy(d, 'IR');
    let avg_light = _.meanBy(d, 'light');
    let avg_pressure = _.meanBy(d, 'pressure');
    let avg_uv = _.meanBy(d, 'UV');
    let avged_data = [avg_temp, avg_humidity, avg_co2, avg_voc, avg_ir,
    avg_light, avg_pressure, avg_uv];
    this.averages = avged_data; 

    //fix times
    let data_times = _.map(d, 'datetime');
    let parsed_date = [];
    for(let i = 0; i < data_times.length; i++){
        let date = new Date(data_times[i]);
        let year = date.getFullYear();
        let day = date.getDate();
        //formatted as YY/MM/DD
        let locale = 'en-us';
        let month = date.toLocaleString(locale, { month : "short" })
        let parsed = (day + ' ' + month + ' ' + year);
        parsed_date.push(parsed);
    }
    this.dates = parsed_date;
    //map sensor data raw values
    let temp = _.map(d, 'temperature');
    let humid = _.map(d, 'humidity');
    let co2 = _.map(d, 'co2');
    let voc = _.map(d, 'voc');
    let ir = _.map(d, 'IR');
    let light = _.map(d, 'light');
    let pressure = _.map(d, 'pressure');
    let uv = _.map(d, 'UV');
    let mappedsensordata = [temp, humid, co2, voc, ir, light, pressure, uv];
    this.sensordata = mappedsensordata;


   // this.rightnow = avg_temp;
    /*
    this.dashover = new Chart(this.dashCanvas.nativeElement, {
      
                 type: 'bar',
                 data: {
                     labels: ["Temperature", "Humidity", "CO2", "VOCs", ],
                     datasets: [{
                         data: [avg_temp,  avg_humidity, avg_co2, avg_voc, avg_uv, avg_ir, avg_light],
                         backgroundColor: [
                             'rgba(255, 99, 132, 0.2)',
                             'rgba(54, 162, 235, 0.2)',
                             'rgba(255, 206, 86, 0.2)',
                             'rgba(75, 192, 192, 0.2)',
                             'rgba(153, 102, 255, 0.2)',
                             'rgba(255, 159, 64, 0.2)'
                         ],
                         hoverBackgroundColor: [
                             "#FF6384",
                             "#36A2EB",
                             "#FFCE56",
                             "#FF6384",
                             "#36A2EB",
                             "#FFCE56"
                         ],
                         scales: {
                          xAxes: [{
                              stacked: true,
                          }],
                          yAxes: [{
                              stacked: true
                          }]
                      }
                     }]
                 }
      
             }) */
    }); 
  }

  test() {
    let token = this.userServiceProvider.getToken().then((token) => {
      console.log(token);
    });
  }

}
