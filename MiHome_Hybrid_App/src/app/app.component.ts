import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ModalController } from 'ionic-angular';
import { RegisterPage } from '../pages/register/register';
import { AboutPage } from '../pages/about/about';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { ProfilePage } from '../pages/profile/profile';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { DataProvider } from '../providers/data-service/data-service';
import { SetupPage } from '../pages/setup/setup';
import { TempHumidityPage } from '../pages/dashboard/dashpages/tempHum';
import { CO2VOCPage } from '../pages/dashboard/dashpages/co2voc';
import { PressurePage } from '../pages/dashboard/dashpages/pressure';
import { UVLightPage } from '../pages/dashboard/dashpages/uvlight';
import { IRPage } from '../pages/dashboard/dashpages/ir';
import { DevicesPage } from '../pages/devices/devices';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, icon:string, component: any}>;
  authpages: Array<{title: string, icon:string, component: any}>;

<<<<<<< HEAD
  constructor(
    public userServiceProvider:UserServiceProvider,
    public authServiceProvider:AuthServiceProvider,
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public modalCtrl: ModalController) {
=======
  constructor(public dataProvider:DataProvider, public userServiceProvider:UserServiceProvider,public authServiceProvider:AuthServiceProvider,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public modalCtrl: ModalController) {
>>>>>>> origin/master
    this.initializeApp();

    this.pages = [
      { title: 'Home', icon:'home', component: HomePage },
      { title: 'Login', icon:'log-in', component: LoginPage },
      { title: 'Register', icon:'person-add', component: RegisterPage }
    ];

    this.authpages = [
      { title: 'About', icon:'information-circle', component: AboutPage },
      { title: 'Dashboard', icon:'desktop',component: DashboardPage },
      { title: 'My Hubs', icon:'hammer', component: DevicesPage },
      { title: 'My Profile', icon:'person', component: ProfilePage }
    ];

    var self = this;
    this.userServiceProvider.getToken().then(function(token){
        if (token === null) {
          self.authServiceProvider.setAuth(false);
        } else {
          self.authServiceProvider.setAuth(true);
        }
    });

  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#69b5c6');
      this.splashScreen.hide();
    });
  }

  openPage(page) {
<<<<<<< HEAD
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
=======

>>>>>>> origin/master
    if (page.title == "Login") {

      let profileModal = this.modalCtrl.create(page.component, { });
      profileModal.onDidDismiss(obj => {
        console.log(JSON.stringify(obj));
      if (obj.status) {
        this.dataProvider.devices(obj.user.id,obj.token).subscribe(
          data => {
            if (data['data'].length != 0) {
              this.nav.setRoot(DashboardPage);
            } else {
              this.nav.setRoot(DevicesPage);
            }
          },
          err => {

          }
        );

      }
      });
      profileModal.present();

    } else if (page.title == "Register") {
      let profileModal = this.modalCtrl.create(page.component, { userId: 8675309 });
      profileModal.present();
    } else {
      this.nav.setRoot(page.component);
    }

  }
}
