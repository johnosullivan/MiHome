import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CalendarComponentOptions } from 'ion2-calendar';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Socket } from 'ng-socket-io';

@Component({
  selector: 'page-setup',
  templateUrl: 'setup.html',providers:[BarcodeScanner]
})
export class SetupPage {

  dateRange: { from: string; to: string; };
  type: 'string';
  optionsRange: CalendarComponentOptions = {
    pickMode: 'range'
  };
  nodeid:any;
  name:any;
  isSpinner:boolean;
  state:any;
  hub:any;

  constructor(private socket: Socket, private barcodeScanner: BarcodeScanner,private qrScanner: QRScanner,public navCtrl: NavController, public navParams: NavParams) {
    this.nodeid = '';
    this.name = '';
    this.isSpinner = false;
    this.state = { stage_one:true, stage_one_qr:false, stage_two:false }
    this.hub = {};

    this.socket.fromEvent("00000012340987011_RES_HUB").subscribe(data => {
      this.hub = data;
    });

  }

  ionViewDidLoad() { }

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
      if (barcodeData.text != "") {
        self.nodeid = barcodeData.text;
        self.socket.emit("send", { 'emit':'00000012340987011', 'payload': {'command':'info'} });
        self.state.stage_one = false;
        self.state.stage_two = true;
        self.state.stage_one_qr = true;
      }
    }, (err) => {

    });
  }

}
