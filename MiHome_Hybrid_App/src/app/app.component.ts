import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { ModalController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../pages/register/register';
import { AboutPage } from '../pages/about/about';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { ProfilePage } from '../pages/profile/profile';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { DatePicker } from 'ionic2-date-picker';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, icon:string, component: any}>;
  authpages: Array<{title: string, icon:string, component: any}>;

  constructor(public authServiceProvider:AuthServiceProvider,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public modalCtrl: ModalController) {
    this.initializeApp();
    // { title: 'Dashboard', icon:'desktop', component: DashboardPage }
    // used for an example of ngFor and navigation
    //this.statusBar.backgroundColorByHexString('#222111');

    this.pages = [
      { title: 'Home', icon:'home', component: HomePage },
      { title: 'Login', icon:'log-in', component: LoginPage },
      { title: 'Register', icon:'person-add', component: RegisterPage }
    ];

    this.authpages = [
      { title: 'About', icon:'information-circle', component: AboutPage },
      { title: 'Dashboard', icon:'desktop',component: DashboardPage },
      { title: 'My Profile', icon:'person', component: ProfilePage }
    ];

  }

  login() {

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.overlaysWebView(false);

        // set status bar to white
      this.statusBar.backgroundColorByHexString('#69b5c6');
      this.splashScreen.hide();
    });
  }

  openPage(page) {

    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.title == "Login") {
      let profileModal = this.modalCtrl.create(page.component, { userId: 8675309 });
      profileModal.onDidDismiss(status => {
      if (status) {
        this.nav.setRoot(DashboardPage);
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
