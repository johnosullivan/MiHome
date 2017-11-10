import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CalendarComponentOptions } from 'ion2-calendar';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-setup',
  templateUrl: 'setup.html',providers:[BarcodeScanner]
})
export class SetupPage {

  dateRange: { from: string; to: string; };
  type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  optionsRange: CalendarComponentOptions = {
    pickMode: 'range'
  };
  nodeid:any;
  name:any;
  isSpinner:boolean;
  constructor(private barcodeScanner: BarcodeScanner,private qrScanner: QRScanner,public navCtrl: NavController, public navParams: NavParams) {
    this.nodeid = '';
    this.name = '';
    this.isSpinner = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  configs() {
    this.isSpinner = true;
    var self = this;
    setTimeout(function() {
      self.isSpinner = false;
    }, 3000);
  }

  qr() {


    var self = this;
    this.barcodeScanner.scan().then((barcodeData) => {
      console.log(barcodeData);
      self.nodeid = barcodeData.text;
    }, (err) => {

    });



  }

}
