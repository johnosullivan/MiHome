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

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public modalCtrl: ModalController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.statusBar.backgroundColorByHexString('red');

    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Login', component: LoginPage },
      { title: 'Register', component: RegisterPage },
      { title: 'About', component: AboutPage },
      { title: 'Dashboard', component: DashboardPage },
      { title: 'My Profile', component: ProfilePage }
    ];

  }

  login() {

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {

    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.title == "Login") {
      let profileModal = this.modalCtrl.create(page.component, { userId: 8675309 });
      profileModal.present();
    } else if (page.title == "Register") {
      let profileModal = this.modalCtrl.create(page.component, { userId: 8675309 });
      profileModal.present();
    } else {
      this.nav.setRoot(page.component);
    }


  }
}
