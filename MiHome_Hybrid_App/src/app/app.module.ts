import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { AboutPage } from '../pages/about/about';
import { IonicStorageModule } from '@ionic/storage';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { DashboardPage } from '../pages/dashboard/dashboard';
import { ProfilePage } from '../pages/profile/profile';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { DatePicker } from 'ionic2-date-picker';
import { SetupPage } from '../pages/setup/setup';

import { CalendarModule } from "ion2-calendar";
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { Camera } from '@ionic-native/camera';
import { DataProvider } from '../providers/data-service/data-service';
import { DevicesPage } from '../pages/devices/devices';

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';

const config: SocketIoConfig = { url: 'https://pacific-springs-32410.herokuapp.com/', options: {reconnect: true} };

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    AboutPage,
    DashboardPage,
    ProfilePage,
    DatePicker,
    SetupPage,
    DevicesPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      platforms: {
        ios: {
          statusbarPadding: false
        }
      }
    }),
    IonicStorageModule.forRoot(),
    CalendarModule,
    SocketIoModule.forRoot(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    AboutPage,
    DashboardPage,
    ProfilePage,
    DatePicker,
    SetupPage,
    DevicesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    UserServiceProvider,
    DatePicker,
    QRScanner,
    Camera,
    DataProvider
  ]
})
export class AppModule {}
