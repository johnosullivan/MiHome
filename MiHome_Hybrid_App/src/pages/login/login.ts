import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { AlertController } from 'ionic-angular';
//@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  creds:any;
  error:string;
  isSpinner:boolean;
  constructor(public alertCtrl: AlertController,public viewController:ViewController,public navCtrl: NavController, public navParams: NavParams,public authServiceProvider:AuthServiceProvider,public userServiceProvider:UserServiceProvider) {
    this.creds = {password:'',username:''};
    this.error = '';
    this.isSpinner = false;
  }

  ionViewDidLoad() { }

  closeModal() {
    this.viewController.dismiss({status:false});
  }

  login() {
    this.isSpinner = true;
    this.authServiceProvider.login(this.creds).subscribe(
      data => {
        if (data.success) {
          console.log(data);
          this.userServiceProvider.saveToken(data.token);
          this.userServiceProvider.saveUser(data.user);
          this.authServiceProvider.setAuth(true);
          this.isSpinner = true;
          this.viewController.dismiss({status:true,user:data.user,token:data.token});
          this.authServiceProvider.setAuth(true);
        } else {

        }
      },
      err => {
        console.log(JSON.stringify(err._body));
        this.error = JSON.parse(err._body).message;
        this.isSpinner = false;
        this.creds['password'] = '';
      },
      () => console.log('Logging in....')
    );
    //this.navCtrl.pop();
    //this.viewController.dismiss(true);
    //this.authServiceProvider.setAuth(true);
    //this.userServiceProvider.saveToken('data.token');
    /*const alert = this.alertCtrl.create({
   title: 'Authentication Failed!',
   subTitle: 'Please check your credentials and try again.',
   buttons: ['Dismiss']
 });
 alert.present();*/
  }

}
