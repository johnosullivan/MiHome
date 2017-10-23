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
  constructor(private barcodeScanner: BarcodeScanner,private qrScanner: QRScanner,public navCtrl: NavController, public navParams: NavParams) {
    this.nodeid = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
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
