webpackJsonp([2],{

/***/ 152:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user_service_user_service__ = __webpack_require__(44);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





//@IonicPage()
var LoginPage = (function () {
    function LoginPage(alertCtrl, viewController, navCtrl, navParams, authServiceProvider, userServiceProvider) {
        this.alertCtrl = alertCtrl;
        this.viewController = viewController;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authServiceProvider = authServiceProvider;
        this.userServiceProvider = userServiceProvider;
        this.creds = { password: '', username: '' };
        this.error = '';
        this.isSpinner = false;
    }
    LoginPage.prototype.ionViewDidLoad = function () { };
    LoginPage.prototype.closeModal = function () {
        this.viewController.dismiss({ status: false });
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        this.isSpinner = true;
        this.authServiceProvider.login(this.creds).subscribe(function (data) {
            if (data.success) {
                console.log(data);
                _this.userServiceProvider.saveToken(data.token);
                _this.userServiceProvider.saveUser(data.user);
                _this.authServiceProvider.setAuth(true);
                _this.isSpinner = true;
                _this.viewController.dismiss({ status: true, user: data.user, token: data.token });
                _this.authServiceProvider.setAuth(true);
            }
            else {
            }
        }, function (err) {
            console.log(JSON.stringify(err._body));
            _this.error = JSON.parse(err._body).message;
            _this.isSpinner = false;
            _this.creds['password'] = '';
        }, function () { return console.log('Logging in....'); });
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
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-login',template:/*ion-inline-start:"/Users/johnosullivan/Desktop/MiHome/MiHome_Hybrid_App/src/pages/login/login.html"*/'\n<ion-header>\n\n  <ion-navbar color="themenav">\n    <ion-title>Mi Home Portal</ion-title>\n            <ion-buttons end>\n             <button ion-button icon-only (click)="closeModal()">\n               <ion-icon name="close"></ion-icon>\n             </button>\n           </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content style="background-color: #eee;">\n  <ion-row>\n   <ion-col>\n     <ion-list inset>\n\n       <ion-item>\n         <ion-input type="text" [(ngModel)]="creds.username" placeholder="Username" name="username"  required></ion-input>\n       </ion-item>\n\n       <ion-item>\n         <ion-input type="password" [(ngModel)]="creds.password" placeholder="Password" name="password"  required></ion-input>\n       </ion-item>\n\n     </ion-list>\n   </ion-col>\n </ion-row>\n <div style="text-align:center">\n <span style="color:red;">{{error}}</span>\n </div>\n<div padding>\n <ion-row>\n   <ion-col class="signup-col">\n     <button ion-button color="menutheme" (click)="login()" full>Login<ion-spinner name="bubbles" *ngIf="isSpinner"></ion-spinner></button>\n   </ion-col>\n </ion-row>\n</div>\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/johnosullivan/Desktop/MiHome/MiHome_Hybrid_App/src/pages/login/login.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__["a" /* AuthServiceProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_user_service_user_service__["a" /* UserServiceProvider */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 153:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__ = __webpack_require__(73);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var RegisterPage = (function () {
    function RegisterPage(authServiceProvider, navCtrl, navParams, viewController) {
        this.authServiceProvider = authServiceProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewController = viewController;
        this.regs = {};
        this.payload = {};
        this.isSpinner = false;
        this.error = '';
    }
    RegisterPage.prototype.ionViewDidLoad = function () {
    };
    RegisterPage.prototype.closeModal = function () {
        this.navCtrl.pop();
    };
    RegisterPage.prototype.register = function () {
        var _this = this;
        console.log(this.payload);
        this.isSpinner = true;
        this.authServiceProvider.register(this.payload).subscribe(function (data) {
            if (data.success) {
                console.log(data);
                _this.isSpinner = false;
                _this.viewController.dismiss({ status: true, creds: _this.payload });
            }
            else {
            }
        }, function (err) {
            console.log(JSON.stringify(err._body));
            _this.error = JSON.parse(err._body).message;
            _this.isSpinner = false;
        }, function () { return console.log('Register'); });
    };
    return RegisterPage;
}());
RegisterPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-register',template:/*ion-inline-start:"/Users/johnosullivan/Desktop/MiHome/MiHome_Hybrid_App/src/pages/register/register.html"*/'<ion-header>\n\n  <ion-navbar color="themenav">\n    <ion-title>Mi Home Register</ion-title>\n      <ion-buttons end>\n       <button ion-button icon-only (click)="closeModal()">\n         <ion-icon name="close"></ion-icon>\n       </button>\n     </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content style="background-color: #eee;">\n\n\n  <ion-row>\n   <ion-col>\n     <ion-list inset>\n\n       <ion-item>\n         <ion-input type="text" placeholder="First Name" name="first name" [(ngModel)]="payload.firstName" required></ion-input>\n       </ion-item>\n\n       <ion-item>\n         <ion-input type="text" placeholder="Last Name" name="last name" [(ngModel)]="payload.lastName" required></ion-input>\n       </ion-item>\n\n       <ion-item>\n         <ion-input type="text" placeholder="Username" name="username" [(ngModel)]="payload.username" required></ion-input>\n       </ion-item>\n\n       <ion-item>\n         <ion-input type="password" placeholder="Password" name="password" [(ngModel)]="payload.password" required></ion-input>\n       </ion-item>\n\n       <ion-item>\n         <ion-input type="password" placeholder="Re-enter Password" name="password" [(ngModel)]="payload.repassword" required></ion-input>\n       </ion-item>\n\n       <ion-item>\n         <ion-input type="text" placeholder="Email" name="email" [(ngModel)]="payload.email" required></ion-input>\n       </ion-item>\n\n     </ion-list>\n   </ion-col>\n </ion-row>\n <div style="text-align:center">\n <span style="color:red;">{{error}}</span>\n </div>\n<div padding>\n <ion-row>\n   <ion-col class="signup-col">\n     <button ion-button class="submit-btn" full type="submit" color="menutheme" (click)="register()">Register <ion-spinner name="bubbles" *ngIf="isSpinner"></ion-spinner></button>\n   </ion-col>\n </ion-row>\n</div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/johnosullivan/Desktop/MiHome/MiHome_Hybrid_App/src/pages/register/register.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__["a" /* AuthServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */]])
], RegisterPage);

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 167:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_barcode_scanner__ = __webpack_require__(220);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AboutPage = (function () {
    function AboutPage(barcodeScanner, navCtrl, navParams) {
        this.barcodeScanner = barcodeScanner;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.optionsRange = {
            pickMode: 'range'
        };
    }
    AboutPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AboutPage');
    };
    AboutPage.prototype.qr = function () {
        this.barcodeScanner.scan().then(function (barcodeData) {
            console.log(barcodeData);
        }, function (err) {
        });
    };
    return AboutPage;
}());
AboutPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-about',template:/*ion-inline-start:"/Users/johnosullivan/Desktop/MiHome/MiHome_Hybrid_App/src/pages/about/about.html"*/'<ion-header>\n  <ion-navbar color="themenav">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Mi Home About</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n\n<ion-content style="background-color:#eee;">\n  \n    <!--<button ion-button (click)="showToast(\'Yo Man! Its working \', \'center\')">Default</button> -->\n    <ion-card>\n      <ion-card-content>\n        <ion-card-title>What is MiHome?</ion-card-title>\n        <p style="line-height: 1.5em;">\n          MiHome is an open source environmental sensor.\n          It was designed to provide students and researchers a cheap and reliable platform to collect\n          information about their homes, offices, classrooms, or anywhere else they may need to study. \n          Users of MiHome have the options of building on top of the Particle IoT platform, or they can \n          build their own with Arduinos.\n        </p>\n        <div text-center>\n            <ion-img width="120" height="100" style="background-color:rgb(255, 255, 255);" src="assets/arduino.png"></ion-img>\n          </div>\n          <ion-card-title>Hardware</ion-card-title>\n          <p style="line-height: 1.5em;">\n              The Particle IoT platform is an easy way of to be introduced to the world of <em>IoT</em>, or "Internet of Things". \n              It\'s simple: connect one of your interent able devices into an array of sensors and/or hardware. \n              After prrogramming some firmware with Particle\'s online IDE, you will have successfully launched an IoT device.\n              This approach is one of the ways MiHome supplies fast and reliable data to its users. \n              The most recent version of the MiHome system does not actually use the Particle IoT platform, but rather it uses the \n              ESP8266 Wifi module which is Arduino compatible. Within this setup, the Hub \n              contains the ESP8266 Wifi module and a 915MHz radio transceiver and the \n              nodes contains all the sensor equipment which is packaged with an Arduino Nano and \n              the same 915MHz radio transceivers.\n            </p>\n            <br/>\n            <div text-center>\n                <ion-img width="100" height="100" style="background-color:rgb(255, 255, 255);" src="assets/img/ionic.png"></ion-img>\n              </div>\n              <ion-card-title>Software</ion-card-title>\n              <p style="line-height: 1.5em;">\n                MiHome was created using Apache Cordova and Ionic 2 in order to create a cross-platform\n                mobile app. Functionally MiHome takes place inside of a webview which allows the pages to\n                be written using HTML, SCSS, and TypeScript.\n                </p>\n      </ion-card-content>\n    </ion-card>\n\n</ion-content>\n'/*ion-inline-end:"/Users/johnosullivan/Desktop/MiHome/MiHome_Hybrid_App/src/pages/about/about.html"*/, providers: [__WEBPACK_IMPORTED_MODULE_2__ionic_native_barcode_scanner__["a" /* BarcodeScanner */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_native_barcode_scanner__["a" /* BarcodeScanner */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
], AboutPage);

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 168:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user_service_user_service__ = __webpack_require__(44);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProfilePage = (function () {
    function ProfilePage(userServiceProvider, authServiceProvider, navCtrl, navParams) {
        var _this = this;
        this.userServiceProvider = userServiceProvider;
        this.authServiceProvider = authServiceProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.user = {};
        this.userServiceProvider.getUser().then(function (user) {
            _this.user = user;
        });
    }
    ProfilePage.prototype.ionViewDidLoad = function () { };
    return ProfilePage;
}());
ProfilePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-profile',template:/*ion-inline-start:"/Users/johnosullivan/Desktop/MiHome/MiHome_Hybrid_App/src/pages/profile/profile.html"*/'<ion-header>\n  <ion-navbar color="themenav">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>My Profile</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding style="background-color: #eee;">\n\n  <ion-list>\n\n\n    <ion-item>\n      <ion-label>{{user.firstName}}</ion-label>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>{{user.lastName}}</ion-label>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>{{user.email}}</ion-label>\n    </ion-item>\n\n\n  </ion-list>\n\n</ion-content>\n'/*ion-inline-end:"/Users/johnosullivan/Desktop/MiHome/MiHome_Hybrid_App/src/pages/profile/profile.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__providers_user_service_user_service__["a" /* UserServiceProvider */],
        __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
], ProfilePage);

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 177:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 177;

/***/ }),

/***/ 219:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/about/about.module": [
		623,
		1
	],
	"../pages/profile/profile.module": [
		624,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 219;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 263:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__register_register__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_chart_js__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_chart_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_WindowRef__ = __webpack_require__(384);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var HomePage = (function () {
    function HomePage(winRef, navCtrl, modalCtrl, platform) {
        this.winRef = winRef;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.platform = platform;
        this.title = "Welcome";
    }
    HomePage.prototype.openLogin = function () {
        var loginModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
        loginModal.present();
    };
    HomePage.prototype.openReg = function () {
        var regModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__register_register__["a" /* RegisterPage */]);
        regModal.present();
    };
    HomePage.prototype.plugintest = function () {
        console.log("Plugin testing...");
        this.winRef.nativeWindow.MiHomePlugin.echo("echo", function (date) {
            console.log(date);
        });
    };
    HomePage.prototype.ionViewDidLoad = function () {
        this.circleChart = new __WEBPACK_IMPORTED_MODULE_4_chart_js__["Chart"](this.circleCanvas.nativeElement, {
            type: 'doughnut',
            data: {
                labels: ["C++", "TypeScript", "HTML", "Arduino", "Javascript", "CSS", "Other"],
                datasets: [{
                        label: '% of project',
                        data: [48.4, 19.6, 13.4, 10.8, 5.1, 1.3, 1.4],
                        backgroundColor: [
                            'rgba(255, 86, 122, 0.7)',
                            'rgba(57, 125, 204, 0.7)',
                            'rgba(255, 195, 91, 0.7)',
                            'rgba(45, 183, 64, 0.7)',
                            'rgba(95, 100, 135, 0.7)',
                            'rgba(186, 113, 5, 0.7)',
                            'rgba(186, 4, 74, 0.7)'
                        ],
                        hoverBackgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56",
                            "#2db740",
                            "#e87aa8",
                            "#5f6487",
                            "#ba7105",
                            "#ba044a"
                        ]
                    }]
            },
            options: {
                tooltips: {
                    enabled: false
                }
            }
        });
    };
    return HomePage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('circleCanvas'),
    __metadata("design:type", Object)
], HomePage.prototype, "circleCanvas", void 0);
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-home',template:/*ion-inline-start:"/Users/johnosullivan/Desktop/MiHome/MiHome_Hybrid_App/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar color="themenav">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Mi Home</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content style="background-color:rgb(253, 252, 252);">\n\n  <!--<button ion-button (click)="showToast(\'Yo Man! Its working \', \'center\')">Default</button> -->\n  <!-- <img src="assets/img/mihometransparent.png"/> -->\n      <ion-row>\n          <ion-col text-center class="top-buffer">\n              <h1 class="text-center">Welcome to MiHome</h1>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col text-center>\n              <h5 class ="text-center ">Open Source Environmental Data Collection</h5>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col text-center>\n              <ion-img style="background-color:rgb(253, 252, 252);" width="120" height="160" src="assets/img/mihometransparent.png"></ion-img>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col text-center>\n              <ion-card>\n                  <ion-card-header>\n                    Access + Knowledge<hr/>\n                  </ion-card-header>\n                  <ion-card-content>\n                    <canvas #circleCanvas></canvas>\n                    <p>100% Awesome</p>\n                  </ion-card-content>\n                </ion-card>\n          </ion-col>\n        </ion-row>\n        <button ion-button color="menutheme" (click)="plugintest()" full>Plugin Test</button>\n</ion-content>\n'/*ion-inline-end:"/Users/johnosullivan/Desktop/MiHome/MiHome_Hybrid_App/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__app_WindowRef__["a" /* WindowRef */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 384:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WindowRef; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

function _window() {
    return window;
}
var WindowRef = (function () {
    function WindowRef() {
    }
    Object.defineProperty(WindowRef.prototype, "nativeWindow", {
        get: function () {
            return _window();
        },
        enumerable: true,
        configurable: true
    });
    return WindowRef;
}());
WindowRef = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], WindowRef);

//# sourceMappingURL=WindowRef.js.map

/***/ }),

/***/ 385:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_service_user_service__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_date_picker__ = __webpack_require__(556);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dashpages_tempHum__ = __webpack_require__(386);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__dashpages_co2voc__ = __webpack_require__(387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__dashpages_pressure__ = __webpack_require__(388);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__dashpages_IR__ = __webpack_require__(389);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__dashpages_uvlight__ = __webpack_require__(390);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_data_service_data_service__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_lodash__ = __webpack_require__(557);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_lodash__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var DashboardPage = DashboardPage_1 = (function () {
    function DashboardPage(dataProvider, toastCtrl, alertCtrl, datePicker, viewController, modalCtrl, navCtrl, navParams, userServiceProvider, sensorData, platform) {
        this.dataProvider = dataProvider;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.datePicker = datePicker;
        this.viewController = viewController;
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userServiceProvider = userServiceProvider;
        this.sensorData = sensorData;
        this.platform = platform;
        this.rootPage = DashboardPage_1;
        var toaststart = this.toastCtrl.create({
            message: 'WARNING: Some of your sensors went offline :/ You can still access historical data, but you will like to contiune to receive the most current data, please go to settings and reconfigure your nodes. Please tap settings to resolve this issue.',
            showCloseButton: true,
            closeButtonText: 'Setup'
        });
        this.dashpages = [
            { title: 'Temperature & Humidity', icon: 'thermometer', component: __WEBPACK_IMPORTED_MODULE_5__dashpages_tempHum__["a" /* TempHumidityPage */] },
            { title: 'Carbon Dioxide & VOCs', icon: 'warning', component: __WEBPACK_IMPORTED_MODULE_6__dashpages_co2voc__["a" /* CO2VOCPage */] },
            { title: 'Pressure', icon: 'cloud-circle', component: __WEBPACK_IMPORTED_MODULE_7__dashpages_pressure__["a" /* PressurePage */] },
            { title: 'UV & Light', icon: 'sunny', component: __WEBPACK_IMPORTED_MODULE_9__dashpages_uvlight__["a" /* UVLightPage */] },
            { title: 'Infrared Light', icon: 'contrast', component: __WEBPACK_IMPORTED_MODULE_8__dashpages_IR__["a" /* IRPage */] },
        ];
    }
    //hardcoded start/end data
    DashboardPage.prototype.getData = function () {
        var _this = this;
        console.log(this.start);
        console.log(this.end);
        this.userServiceProvider.getToken().then(function (token) {
            _this.dataProvider.chartdata(_this.start, _this.end, token).subscribe(function (data) {
                // store the data
                //if there is an error (ex: 403 Forbidden) this
                //will not overwrite the data in last call &
                //the user will see charts based on older data
                //dates will be correct
                console.log(data);
                _this.sensorData.set("lastcall", data);
            });
        });
    };
    DashboardPage.prototype.dismissHandler = function () {
        console.info('Toast onDidDismiss()');
        //this.nav.setRoot(SetupPage);
    };
    DashboardPage.prototype.openPage = function (page) {
        this.navCtrl.push(page.component, {
            averages: this.averages,
            dates: this.dates,
            sensor: this.sensordata
        });
        //push pages cause you want to go back to dash from them
    };
    DashboardPage.prototype.storeSensorData = function () {
        //store sensor data locally so can be referenced by other pages
        //without needing to ping again
        var _this = this;
        this.userServiceProvider.getToken().then(function (token) {
            _this.dataProvider.chartdata("", "", token).subscribe(function (data) {
                // store the data
                //if there is an error (ex: 403 Forbidden) this
                //will not overwrite the data in last call &
                //the user will see charts based on older data
                //dates will be correct
                console.log(data);
                _this.sensorData.set("lastcall", data);
            });
        });
    };
    DashboardPage.prototype.clock = function () {
        var _this = this;
        var toaststart = this.toastCtrl.create({
            message: 'Please select start date/time', position: 'middle'
        });
        //toaststart.present();
        // Start date and time selector
        this.datePicker.show({
            date: new Date(),
            mode: 'datetime',
            androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
        }).then(function (date) {
            _this.start = date;
            var self = _this;
            setTimeout(function () {
                // End date and time selector
                self.datePicker.show({
                    date: new Date(),
                    mode: 'datetime',
                    androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
                }).then(function (date) {
                    self.end = date;
                    self.getData();
                }, function (err) { return console.log('', err); });
            }, 1000);
        }, function (err) { return console.log('', err); });
    };
    DashboardPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storeSensorData();
        console.log("Data refreshed");
        //store data when dash loads
        this.sensorData.get('lastcall').then(function (data) {
            var d = data['data'];
            //get averages
            var avg_temp = __WEBPACK_IMPORTED_MODULE_11_lodash__["meanBy"](d, 'temperature');
            var avg_humidity = __WEBPACK_IMPORTED_MODULE_11_lodash__["meanBy"](d, 'humidity');
            var avg_co2 = __WEBPACK_IMPORTED_MODULE_11_lodash__["meanBy"](d, 'co2');
            var avg_voc = __WEBPACK_IMPORTED_MODULE_11_lodash__["meanBy"](d, 'voc');
            var avg_ir = __WEBPACK_IMPORTED_MODULE_11_lodash__["meanBy"](d, 'IR');
            var avg_light = __WEBPACK_IMPORTED_MODULE_11_lodash__["meanBy"](d, 'light');
            var avg_pressure = __WEBPACK_IMPORTED_MODULE_11_lodash__["meanBy"](d, 'pressure');
            var avg_uv = __WEBPACK_IMPORTED_MODULE_11_lodash__["meanBy"](d, 'UV');
            var avged_data = [avg_temp, avg_humidity, avg_co2, avg_voc, avg_ir,
                avg_light, avg_pressure, avg_uv];
            _this.averages = avged_data;
            //fix times
            var data_times = __WEBPACK_IMPORTED_MODULE_11_lodash__["map"](d, 'datetime');
            var parsed_date = [];
            for (var i = 0; i < data_times.length; i++) {
                var date = new Date(data_times[i]);
                var year = date.getFullYear();
                var day = date.getDate();
                //formatted as YY/MM/DD
                var locale = 'en-us';
                var month = date.toLocaleString(locale, { month: "short" });
                var parsed = (day + ' ' + month + ' ' + year);
                parsed_date.push(parsed);
            }
            _this.dates = parsed_date;
            //map sensor data raw values
            var temp = __WEBPACK_IMPORTED_MODULE_11_lodash__["map"](d, 'temperature');
            var humid = __WEBPACK_IMPORTED_MODULE_11_lodash__["map"](d, 'humidity');
            var co2 = __WEBPACK_IMPORTED_MODULE_11_lodash__["map"](d, 'co2');
            var voc = __WEBPACK_IMPORTED_MODULE_11_lodash__["map"](d, 'voc');
            var ir = __WEBPACK_IMPORTED_MODULE_11_lodash__["map"](d, 'IR');
            var light = __WEBPACK_IMPORTED_MODULE_11_lodash__["map"](d, 'light');
            var pressure = __WEBPACK_IMPORTED_MODULE_11_lodash__["map"](d, 'pressure');
            var uv = __WEBPACK_IMPORTED_MODULE_11_lodash__["map"](d, 'UV');
            var mappedsensordata = [temp, humid, co2, voc, ir, light, pressure, uv];
            _this.sensordata = mappedsensordata;
        });
    };
    DashboardPage.prototype.test = function () {
        var token = this.userServiceProvider.getToken().then(function (token) {
            console.log(token);
        });
    };
    return DashboardPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */])
], DashboardPage.prototype, "nav", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('rightnow'),
    __metadata("design:type", Object)
], DashboardPage.prototype, "rightNowCard", void 0);
DashboardPage = DashboardPage_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-dashboard',template:/*ion-inline-start:"/Users/johnosullivan/Desktop/MiHome/MiHome_Hybrid_App/src/pages/dashboard/dashboard.html"*/'<ion-header>\n  <ion-navbar color="themenav">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Dashboard</ion-title>\n    <ion-buttons end>\n     <button ion-button icon-only (click)="clock()">\n       <ion-icon name="clock"></ion-icon>\n     </button>\n   </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content style="background-color: #eee;">\n\n<div id=allbtns>\n<div id="btndiv" *ngFor="let p of dashpages" >\n  <button id="dashbutton" ion-button large round (click)="openPage(p)">\n    <ion-icon id="btn-icon" item-left name={{p.icon}}></ion-icon> {{p.title}}\n  </button>\n</div>\n</div>\n<ion-card style="background: #42aabe;">\n    <ion-card-header text-center>\n      <h4 style="color: white;"><b>MiHome Dashboard</b></h4>\n    </ion-card-header>\n    <ion-card-content text-center>\n     <p style="color: white;">Click the buttons above to view charts and information about what your MiHome sensors are learning about\n       your home!\n     </p>\n    </ion-card-content>\n  </ion-card>\n\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/johnosullivan/Desktop/MiHome/MiHome_Hybrid_App/src/pages/dashboard/dashboard.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_3__ionic_native_date_picker__["a" /* DatePicker */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_10__providers_data_service_data_service__["a" /* DataProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_date_picker__["a" /* DatePicker */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_user_service_user_service__["a" /* UserServiceProvider */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */]])
], DashboardPage);

var DashboardPage_1;
//# sourceMappingURL=dashboard.js.map

/***/ }),

/***/ 386:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TempHumidityPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chart_js__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_chart_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(45);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TempHumidityPage = (function () {
    function TempHumidityPage(alertCtrl, viewController, navCtrl, navParams, sensorData) {
        this.alertCtrl = alertCtrl;
        this.viewController = viewController;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sensorData = sensorData;
        this.parsed_date = navParams.get("dates");
        this.avged_data = navParams.get("averages");
        this.sensordata = navParams.get("sensor");
        this.averages = [
            { title: 'Your Average Temp', avg: this.avged_data[0] + "°C" },
            { title: 'Your Average Humidity', avg: this.avged_data[1] + "%" },
        ];
    }
    TempHumidityPage.prototype.ionViewDidLoad = function () {
        var self = this;
        //chardata(start, end)
        var t = this.sensordata[0];
        var h = this.sensordata[1];
        self.temphum = new __WEBPACK_IMPORTED_MODULE_2_chart_js__["Chart"](self.temphumCanvas.nativeElement, {
            //CHART 1   
            type: 'line',
            data: {
                labels: this.parsed_date,
                datasets: [
                    {
                        label: "Temperature",
                        fill: false,
                        lineTension: 0.3,
                        backgroundColor: "#5285dd",
                        borderColor: "#5285dd",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'bevel',
                        pointBorderColor: "#5285dd",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 3,
                        pointHitRadius: 10,
                        data: t,
                        spanGaps: false,
                    },
                    {
                        label: "Humidity",
                        fill: false,
                        lineTension: 0.3,
                        backgroundColor: "#37d6c6",
                        borderColor: "#37d6c6",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'bevel',
                        pointBorderColor: "#37d6c6",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 3,
                        pointHitRadius: 10,
                        data: h,
                        spanGaps: false,
                    }
                ]
            }
        });
    };
    ;
    TempHumidityPage.prototype.closeModal = function () { this.navCtrl.pop(); };
    return TempHumidityPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('temphum'),
    __metadata("design:type", Object)
], TempHumidityPage.prototype, "temphumCanvas", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('idealtemp'),
    __metadata("design:type", Object)
], TempHumidityPage.prototype, "idealtempCanvas", void 0);
TempHumidityPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-temphum',template:/*ion-inline-start:"/Users/johnosullivan/Desktop/MiHome/MiHome_Hybrid_App/src/pages/dashboard/dashpages/temphum.html"*/'\n<ion-header>\n    \n      <ion-navbar color="themenav">\n        <ion-title>Temperature & Humidity</ion-title>\n\n      </ion-navbar>\n    \n    </ion-header>\n    \n    \n    <ion-content style="background-color: #eee;" class="card-background-page">\n    \n        <ion-card>\n            <ion-card-header>\n              <h4><b>Temperature / Humidity</b></h4>\n            </ion-card-header>\n            <ion-card-content>\n              <canvas #temphum></canvas>\n            </ion-card-content>\n          </ion-card>\n\n          <ion-card id="facts" text-wrap style="background: #42aabe; color: white;">\n            <ion-card-header text-center>\n                <h2 style="color: white;"><b>Ideals vs Averages</b></h2>\n              </ion-card-header>\n              <ion-card-content>\n              <div id="idealtemp">\n                  <ion-grid text-center>\n                      <ion-row>\n                        <ion-col width-50>\n                        <ion-label>{{averages[0].title}}</ion-label>\n                         {{averages[0].avg}}\n                    </ion-col>\n                      <ion-col width-50>\n                          <ion-label>{{averages[1].title}}</ion-label>\n                           {{averages[1].avg}}\n                      </ion-col>\n                      </ion-row>\n                      <ion-row>\n                        <div class="container">\n                          <b>What is ideal indoor temperature and humidity?</b><hr/>\n                          Ideally your indoor temperature should be betweenn 23°C and 25.5°C to be\n                            comfortable for most people. This works out to be between 68°F and 78°F\n                            if you are more familiar with those ranges.<hr/>\n                            Indoor humidity is best between 40-50%; in the winter a lower percentage\n                            is better as higher amounts will lead to condensation.\n                        </div>\n                      </ion-row>\n                    </ion-grid>\n              </div>     \n            </ion-card-content>\n          </ion-card>\n          \n    \n    <div padding>\n    </div>\n    \n    \n    </ion-content>\n    '/*ion-inline-end:"/Users/johnosullivan/Desktop/MiHome/MiHome_Hybrid_App/src/pages/dashboard/dashpages/temphum.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
], TempHumidityPage);

//# sourceMappingURL=tempHum.js.map

/***/ }),

/***/ 387:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CO2VOCPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chart_js__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_chart_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(45);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CO2VOCPage = (function () {
    function CO2VOCPage(alertCtrl, viewController, navCtrl, navParams, sensorData) {
        this.alertCtrl = alertCtrl;
        this.viewController = viewController;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sensorData = sensorData;
        this.parsed_date = navParams.get("dates");
        this.avged_data = navParams.get("averages");
        this.sensordata = navParams.get("sensor");
        this.averages = [
            { title: 'Your Average CO2', avg: this.avged_data[2] + " ppm" },
            { title: 'Your Average VOC count', avg: this.avged_data[3] + " plain count" },
        ];
    }
    CO2VOCPage.prototype.ionViewDidLoad = function () {
        var self = this;
        var co2 = this.sensordata[2];
        var voc = this.sensordata[3];
        self.co2voc = new __WEBPACK_IMPORTED_MODULE_2_chart_js__["Chart"](self.co2vocCanvas.nativeElement, {
            type: 'line',
            data: {
                labels: this.parsed_date,
                datasets: [
                    {
                        label: "CO2",
                        fill: false,
                        lineTension: 0.3,
                        backgroundColor: "#5285dd",
                        borderColor: "#5285dd",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'bevel',
                        pointBorderColor: "#5285dd",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 3,
                        pointHitRadius: 10,
                        data: co2,
                        spanGaps: false,
                    },
                    {
                        label: "VOC",
                        fill: false,
                        lineTension: 0.3,
                        backgroundColor: "#37d6c6",
                        borderColor: "#37d6c6",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'bevel',
                        pointBorderColor: "#37d6c6",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 3,
                        pointHitRadius: 10,
                        data: voc,
                        spanGaps: false,
                    }
                ]
            }
        });
    };
    ;
    CO2VOCPage.prototype.closeModal = function () { this.navCtrl.pop(); };
    return CO2VOCPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('co2voc'),
    __metadata("design:type", Object)
], CO2VOCPage.prototype, "co2vocCanvas", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('ideallevels'),
    __metadata("design:type", Object)
], CO2VOCPage.prototype, "idealcanvas", void 0);
CO2VOCPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-co2voc',template:/*ion-inline-start:"/Users/johnosullivan/Desktop/MiHome/MiHome_Hybrid_App/src/pages/dashboard/dashpages/co2voc.html"*/' <ion-header>\n    \n      <ion-navbar color="themenav">\n        <ion-title>Carbon Dioxide & VOCs</ion-title>\n      </ion-navbar>\n    \n    </ion-header>\n    \n    \n    <ion-content style="background-color: #eee;">\n    \n        <ion-card>\n            <ion-card-header>\n              <h4><b>CO2 / VOC</b></h4>\n            </ion-card-header>\n            <ion-card-content>\n              <canvas #co2voc></canvas>\n            </ion-card-content>\n          </ion-card>\n          <ion-card id="facts" text-wrap style="background: #42aabe; color: white;">\n              <ion-card-header text-center>\n                <h2 style="color: white;"><b>Ideals vs Averages</b></h2>\n                </ion-card-header>\n                <ion-card-content>\n                <div id="ideallevels">\n                    <ion-grid text-center>\n                        <ion-row>\n                          <ion-col width-50>\n                          <ion-label>{{averages[0].title}}</ion-label>\n                           {{averages[0].avg}}\n                      </ion-col>\n                        <ion-col width-50>\n                            <ion-label>{{averages[1].title}}</ion-label>\n                             {{averages[1].avg}}\n                        </ion-col>\n                        </ion-row>\n                        <ion-row>\n                          <div class="container">\n                            <b>What impact do CO2 and VOCs have on my home air quality?</b><hr/>\n                            CO2 (carbon dioxide) is an odorless gas which occurs naturally as a waste product of \n                            respiration as well as from the decomposition of organic materials. There is no\n                            lower limit for CO2, but high levels (above 1000ppm) can cause headaches, fatigue, and\n                            difficulty in beathing.<hr/>\n                            VOCs (volatile organic compounds) are gases which are released from a variety of sources such\n                            as paint thinners, aerosol sprays, dry cleaned clothing, pesiticides, automotive equipment and more.\n                            There is no lower threshold for VOCs indoors, but The US Green Building Council advises that it should be\n                            kept below 500ng/L as above that there is great risk for skin and lung conditions.\n                          </div>\n                        </ion-row>\n                      </ion-grid>\n                </div>     \n              </ion-card-content>\n            </ion-card>\n            \n    \n    \n    </ion-content>\n    '/*ion-inline-end:"/Users/johnosullivan/Desktop/MiHome/MiHome_Hybrid_App/src/pages/dashboard/dashpages/co2voc.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
], CO2VOCPage);

//# sourceMappingURL=co2voc.js.map

/***/ }),

/***/ 388:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PressurePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chart_js__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_chart_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(45);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PressurePage = (function () {
    function PressurePage(alertCtrl, viewController, navCtrl, navParams, sensorData) {
        this.alertCtrl = alertCtrl;
        this.viewController = viewController;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sensorData = sensorData;
        this.parsed_date = navParams.get("dates");
        this.avged_data = navParams.get("averages");
        this.sensordata = navParams.get("sensor");
        this.averages = [
            { title: 'Your Average Pressure', avg: this.avged_data[0] + " Pa" },
        ];
    }
    PressurePage.prototype.ionViewDidLoad = function () {
        var self = this;
        var pressure = this.sensordata[6];
        self.pressure = new __WEBPACK_IMPORTED_MODULE_2_chart_js__["Chart"](self.pressureCanvas.nativeElement, {
            type: 'line',
            data: {
                labels: this.parsed_date,
                datasets: [
                    {
                        label: "Pressure",
                        fill: false,
                        lineTension: 0.3,
                        backgroundColor: "#5285dd",
                        borderColor: "#5285dd",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'bevel',
                        pointBorderColor: "#5285dd",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 3,
                        pointHitRadius: 10,
                        data: pressure,
                        spanGaps: false,
                    }
                ]
            }
        });
    };
    ;
    PressurePage.prototype.closeModal = function () { this.navCtrl.pop(); };
    return PressurePage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('pressure'),
    __metadata("design:type", Object)
], PressurePage.prototype, "pressureCanvas", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('idealtemp'),
    __metadata("design:type", Object)
], PressurePage.prototype, "idealtempCanvas", void 0);
PressurePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-pressure',template:/*ion-inline-start:"/Users/johnosullivan/Desktop/MiHome/MiHome_Hybrid_App/src/pages/dashboard/dashpages/pressure.html"*/'\n<ion-header>\n    \n      <ion-navbar color="themenav">\n        <ion-title>Barometric Pressure</ion-title>\n      </ion-navbar>\n    \n    </ion-header>\n    \n    \n    <ion-content style="background-color: #eee;">\n    \n        <ion-card>\n            <ion-card-header>\n              <h4><b>Barometric Pressure</b></h4>\n            </ion-card-header>\n            <ion-card-content>\n              <canvas #pressure></canvas>\n            </ion-card-content>\n          </ion-card>\n          <ion-card id="facts" text-wrap style="background: #42aabe; color: white;">\n              <ion-card-header text-center>\n                  <h2 style="color: white;"><b>Info Card</b></h2>\n                </ion-card-header>\n                <ion-card-content>\n                <div id="idealtemp">\n                    <ion-grid text-center>\n                        <ion-row>\n                          <ion-col>\n                          <ion-label>{{averages[0].title}}</ion-label>\n                           {{averages[0].avg}}\n                      </ion-col>\n                        </ion-row>\n                        <ion-row>\n                          <div class="container">\n                            <b>What is ideal indoor barometric pressure?</b><hr/>\n                            There is actually not a widely recognized \'comfortable\' pressure for homes;\n                            what is more important to watch for is trends. Sudden \'low\' pressure relative to\n                            what is normal for the individual can cause headaches for some as the sinus tissue \n                            adjusts to the difference. Similiarly, those with arthritis will sometimes notice\n                            \'pain in their bones\' as a storm front moves in, bringing with it a sudden change in\n                            barometric pressure.\n                          </div>\n                        </ion-row>\n                      </ion-grid>\n                </div>     \n              </ion-card-content>\n            </ion-card>\n    <div padding>\n    </div>\n    \n    \n    </ion-content>\n    '/*ion-inline-end:"/Users/johnosullivan/Desktop/MiHome/MiHome_Hybrid_App/src/pages/dashboard/dashpages/pressure.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
], PressurePage);

//# sourceMappingURL=pressure.js.map

/***/ }),

/***/ 389:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IRPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chart_js__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_chart_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(45);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var IRPage = (function () {
    function IRPage(alertCtrl, viewController, navCtrl, navParams, sensorData) {
        this.alertCtrl = alertCtrl;
        this.viewController = viewController;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sensorData = sensorData;
        this.parsed_date = navParams.get("dates");
        this.avged_data = navParams.get("averages");
        this.sensordata = navParams.get("sensor");
        this.averages = [
            { title: 'Your Average IR Light', avg: this.avged_data[4] + " nm" },
        ];
    }
    IRPage.prototype.ionViewDidLoad = function () {
        var self = this;
        var IR = this.sensordata[4];
        self.IR = new __WEBPACK_IMPORTED_MODULE_2_chart_js__["Chart"](self.IRCanvas.nativeElement, {
            type: 'line',
            data: {
                labels: this.parsed_date,
                datasets: [
                    {
                        label: "Infrared Light",
                        fill: false,
                        lineTension: 0.3,
                        backgroundColor: "#5285dd",
                        borderColor: "#5285dd",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'bevel',
                        pointBorderColor: "#5285dd",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 3,
                        pointHitRadius: 10,
                        data: IR,
                        spanGaps: false,
                    }
                ]
            }
        });
    };
    ;
    IRPage.prototype.closeModal = function () { this.navCtrl.pop(); };
    return IRPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('IR'),
    __metadata("design:type", Object)
], IRPage.prototype, "IRCanvas", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('ideallevel'),
    __metadata("design:type", Object)
], IRPage.prototype, "idealCanvas", void 0);
IRPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-IR',template:/*ion-inline-start:"/Users/johnosullivan/Desktop/MiHome/MiHome_Hybrid_App/src/pages/dashboard/dashpages/IR.html"*/'\n<ion-header>\n    \n      <ion-navbar color="themenav">\n        <ion-title>Infrared Light</ion-title>\n      </ion-navbar>\n    \n    </ion-header>\n    \n    \n    <ion-content style="background-color: #eee;">\n    \n        <ion-card>\n            <ion-card-content>\n              <canvas #IR></canvas>\n            </ion-card-content>\n          </ion-card>\n          <ion-card id="facts" text-wrap style="background: #42aabe; color: white;">\n              <ion-card-header text-center>\n                  <h2 style="color: white; size: 4em;"><b>Info Card</b></h2>\n                </ion-card-header>\n                <ion-card-content>\n                <div id="idealtemp">\n                    <ion-grid text-center>\n                        <ion-row>\n                          <ion-col>\n                          <ion-label>{{averages[0].title}}</ion-label>\n                           {{averages[0].avg}}\n                      </ion-col>\n                        </ion-row>\n                        <ion-row>\n                          <div class="container">\n                            <b>What is infrared light?</b><hr/>\n                            Infared light is an invisible type of electromagnetic radiation. IR at most levels\n                            found in everyday enviroments is harmless. If, however, you are using industrial machinery\n                            in your home which emits high levels of IR you should wear protective IR goggles to safeguard\n                            your eyes.\n                          </div>\n                        </ion-row>\n                      </ion-grid>\n                </div>     \n              </ion-card-content>\n            </ion-card>\n    <div padding>\n    </div>\n    \n    \n    </ion-content>\n    '/*ion-inline-end:"/Users/johnosullivan/Desktop/MiHome/MiHome_Hybrid_App/src/pages/dashboard/dashpages/IR.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
], IRPage);

//# sourceMappingURL=IR.js.map

/***/ }),

/***/ 390:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UVLightPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chart_js__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_chart_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(45);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UVLightPage = (function () {
    function UVLightPage(alertCtrl, viewController, navCtrl, navParams, sensorData) {
        this.alertCtrl = alertCtrl;
        this.viewController = viewController;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sensorData = sensorData;
        this.parsed_date = navParams.get("dates");
        this.avged_data = navParams.get("averages");
        this.sensordata = navParams.get("sensor");
        this.averages = [
            { title: 'Your Average UV', avg: this.avged_data[7] + " nm" },
            { title: 'Your Average Indoor Light', avg: this.avged_data[5] + " lux" },
        ];
    }
    UVLightPage.prototype.ionViewDidLoad = function () {
        var self = this;
        //chardata(start, end)
        var uv = this.sensordata[7];
        var light = this.sensordata[5];
        self.temphum = new __WEBPACK_IMPORTED_MODULE_2_chart_js__["Chart"](self.temphumCanvas.nativeElement, {
            //CHART 1   
            type: 'line',
            data: {
                labels: this.parsed_date,
                datasets: [
                    {
                        label: "UV",
                        fill: false,
                        lineTension: 0.3,
                        backgroundColor: "#5285dd",
                        borderColor: "#5285dd",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'bevel',
                        pointBorderColor: "#5285dd",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 3,
                        pointHitRadius: 10,
                        data: uv,
                        spanGaps: false,
                    },
                    {
                        label: "Light",
                        fill: false,
                        lineTension: 0.3,
                        backgroundColor: "#37d6c6",
                        borderColor: "#37d6c6",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'bevel',
                        pointBorderColor: "#37d6c6",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 3,
                        pointHitRadius: 10,
                        data: light,
                        spanGaps: false,
                    }
                ]
            }
        });
    };
    ;
    UVLightPage.prototype.closeModal = function () { this.navCtrl.pop(); };
    return UVLightPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('temphum'),
    __metadata("design:type", Object)
], UVLightPage.prototype, "temphumCanvas", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('idealtemp'),
    __metadata("design:type", Object)
], UVLightPage.prototype, "idealtempCanvas", void 0);
UVLightPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-uvlught',template:/*ion-inline-start:"/Users/johnosullivan/Desktop/MiHome/MiHome_Hybrid_App/src/pages/dashboard/dashpages/uvlight.html"*/'\n<ion-header>\n        \n          <ion-navbar color="themenav">\n            <ion-title>UV & Light</ion-title>\n    \n          </ion-navbar>\n        \n        </ion-header>\n        \n        \n        <ion-content style="background-color: #eee;">\n        \n            <ion-card>\n                <ion-card-header>\n                  <h4><b>UV & Light</b></h4>\n                </ion-card-header>\n                <ion-card-content>\n                  <canvas #temphum></canvas>\n                </ion-card-content>\n              </ion-card>\n    \n              <ion-card id="facts" text-wrap style="background: #42aabe; color: white;">\n                <ion-card-header text-center>\n                    <h2 style="color: white;"><b>Info Card</b></h2>\n                  </ion-card-header>\n                  <ion-card-content>\n                  <div id="idealtemp">\n                      <ion-grid text-center>\n                          <ion-row>\n                            <ion-col width-30>\n                            <ion-label>{{averages[0].title}}</ion-label>\n                             {{averages[0].avg}}\n                        </ion-col>\n                          <ion-col width-70>\n                              <ion-label>{{averages[1].title}}</ion-label>\n                               {{averages[1].avg}}\n                          </ion-col>\n                          </ion-row>\n                          <ion-row>\n                            <div class="container">\n                              <b>What impact do UV and light have on your home?</b><hr/>\n                              UV radiation is produced by the sun and is the primary cause of skin cancer. In \n                              addition to being an naturally occuring carcinogen it also speeds up the aging of\n                              your skin, weakens your eyes, and will cause sunburns. Within your home UV will also cause\n                              discoloration of decoration and excessive exposure can cause plastic materials to become brittle.<hr/>\n                                Visible light, measured in lux, is a general measure of light intensity. This number in and of itself \n                                is not cause for alarm, but should you find yourself feeling low during prolonged periods of low light\n                                you may find it beneficial to be assessed for Seasonal Affective Disorder which may be treated by introducing\n                                artificial light into your environment.\n                            </div>\n                          </ion-row>\n                        </ion-grid>\n                  </div>     \n                </ion-card-content>\n              </ion-card>\n              \n        \n        <div padding>\n        </div>\n        \n        \n        </ion-content>\n        '/*ion-inline-end:"/Users/johnosullivan/Desktop/MiHome/MiHome_Hybrid_App/src/pages/dashboard/dashpages/uvlight.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
], UVLightPage);

//# sourceMappingURL=uvlight.js.map

/***/ }),

/***/ 391:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DevicesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data_service_data_service__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user_service_user_service__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__setup_setup__ = __webpack_require__(392);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng_socket_io__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ng_socket_io__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var DevicesPage = (function () {
    function DevicesPage(socket, userServiceProvider, dataProvider, navCtrl, navParams) {
        this.socket = socket;
        this.userServiceProvider = userServiceProvider;
        this.dataProvider = dataProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.date = Date();
        this.devices = [];
    }
    DevicesPage.prototype.add = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__setup_setup__["a" /* SetupPage */], {});
    };
    DevicesPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.userServiceProvider.getUser().then(function (user) {
            _this.userServiceProvider.getToken().then(function (token) {
                _this.dataProvider.devices(user['id'], token).subscribe(function (data) {
                    if (data.success) {
                        _this.devices = data['data'];
                    }
                }, function (err) {
                    console.log(JSON.stringify(err));
                });
            });
        });
    };
    DevicesPage.prototype.ping = function (device) {
        console.log(device['hubID']);
        this.socket.emit("send", { 'emit': device['hubID'], 'payload': { 'command': 'ping' } });
    };
    DevicesPage.prototype.reset = function (device) {
        console.log(device['hubID']);
        this.socket.emit("send", { 'emit': device['hubID'], 'payload': { 'command': 'reset' } });
    };
    DevicesPage.prototype.ionViewDidLoad = function () {
    };
    return DevicesPage;
}());
DevicesPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-devices',template:/*ion-inline-start:"/Users/johnosullivan/Desktop/MiHome/MiHome_Hybrid_App/src/pages/devices/devices.html"*/'<ion-header>\n  <ion-navbar color="themenav">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>My Hubs</ion-title>\n    <ion-buttons end>\n     <button ion-button icon-only (click)="add()">\n       <ion-icon name="add"></ion-icon>\n     </button>\n   </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content style="background-color: #eee;">\n  <ion-list *ngFor="let device of devices">\n    <ion-item-sliding>\n      <ion-item>\n        <ion-avatar item-start>\n          <img src="assets/arduino.png">\n        </ion-avatar>\n        <ion-avatar item-end>\n        </ion-avatar>\n        <h2><b>{{device.name}}</b></h2>\n        <h6>HID: {{device.hubID}}</h6>\n        <small>Firmware v{{device.firmware}} # of SAND: 1</small>\n      </ion-item>\n      <ion-item-options side="left">\n        <button ion-button color="primary">\n          <ion-icon name="hammer"></ion-icon>\n          Re-Config\n        </button>\n        <button ion-button color="danger" (click)="reset(device)">\n          <ion-icon name="trash"></ion-icon>\n          Delete\n        </button>\n      </ion-item-options>\n      <ion-item-options side="right">\n        <button ion-button color="menutheme" (click)="ping(device)">\n          <ion-icon name="arrow-round-down"></ion-icon>\n          Ping\n        </button>\n      </ion-item-options>\n    </ion-item-sliding>\n  </ion-list>\n\n</ion-content>\n'/*ion-inline-end:"/Users/johnosullivan/Desktop/MiHome/MiHome_Hybrid_App/src/pages/devices/devices.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ng_socket_io__["Socket"], __WEBPACK_IMPORTED_MODULE_3__providers_user_service_user_service__["a" /* UserServiceProvider */], __WEBPACK_IMPORTED_MODULE_2__providers_data_service_data_service__["a" /* DataProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
], DevicesPage);

//# sourceMappingURL=devices.js.map

/***/ }),

/***/ 392:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SetupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_qr_scanner__ = __webpack_require__(558);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_barcode_scanner__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng_socket_io__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng_socket_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_data_service_data_service__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_user_service_user_service__ = __webpack_require__(44);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SetupPage = (function () {
    function SetupPage(userServiceProvider, dataProvider, socket, barcodeScanner, qrScanner, navCtrl, navParams) {
        var _this = this;
        this.userServiceProvider = userServiceProvider;
        this.dataProvider = dataProvider;
        this.socket = socket;
        this.barcodeScanner = barcodeScanner;
        this.qrScanner = qrScanner;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.optionsRange = {
            pickMode: 'range'
        };
        this.nodeid = '';
        this.name = '';
        this.isSpinner = false;
        this.state = { stage_one: true, stage_one_qr: false, stage_two: false };
        this.hub = {};
        this.socket.fromEvent("00000012340987011_RES_HUB").subscribe(function (data) {
            _this.hub = data;
        });
    }
    SetupPage.prototype.ionViewDidLoad = function () { };
    SetupPage.prototype.configs = function () {
        var _this = this;
        this.isSpinner = true;
        var self = this;
        this.userServiceProvider.getUser().then(function (user) {
            _this.userServiceProvider.getToken().then(function (token) {
                var payload = {
                    "hubID": _this.nodeid,
                    "firmware": _this.hub['firmware'],
                    "encrypted": true,
                    "connected": true,
                    "userID": user['id'],
                    "name": _this.name,
                    "token": token
                };
                _this.dataProvider.link(payload).subscribe(function (data) {
                    self.isSpinner = false;
                    _this.socket.emit("send", { 'emit': _this.nodeid, 'payload': { 'command': 'linked' } });
                    //self.navCtrl.setRoot(DevicesPage);
                    self.navCtrl.pop();
                }, function (err) {
                    console.log(JSON.stringify(err));
                });
            });
        });
    };
    SetupPage.prototype.qr = function () {
        var self = this;
        this.barcodeScanner.scan().then(function (barcodeData) {
            if (barcodeData.text != "") {
                self.nodeid = barcodeData.text;
                self.socket.emit("send", { 'emit': self.nodeid, 'payload': { 'command': 'info' } });
                self.state.stage_one = false;
                self.state.stage_two = true;
                self.state.stage_one_qr = true;
            }
        }, function (err) {
        });
    };
    return SetupPage;
}());
SetupPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-setup',template:/*ion-inline-start:"/Users/johnosullivan/Desktop/MiHome/MiHome_Hybrid_App/src/pages/setup/setup.html"*/'<ion-header>\n  <ion-navbar color="themenav">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Setup</ion-title>\n    <ion-buttons end>\n     <button ion-button icon-only (click)="clock()">\n       <ion-icon name="information-circle"></ion-icon>\n     </button>\n   </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content style="background-color: #eee;">\n\n  <ion-card>\n\n    <ion-card-header><b>Linking MiHome Hub</b></ion-card-header>\n\n    <ion-card-content>\n      <div *ngIf="state.stage_one">\n        <p style="line-height: 1.5em;">If your MiHome Hub is <b>bright yellow</b> you are ready to proceed. \n          If <b>bright white</b> please power down your MiHome Hub by unplugging it \n          and plugging it back into a power source. If you are experiencing something else, \n          please tap the help icon at the top right to troublshoot your hardware. Once you are seeing the <b>yellow light</b>\n          you can begin linking your MiHome node to this app. To start, tap the button below to scan your MiHome Hub QR Code.</p>\n        <br>\n        <button ion-button full color="menutheme" (click)="qr()" [(disabled)]="state.stage_one_qr">Scan Hub QR Code</button>\n      </div>\n      <div *ngIf="state.stage_two">\n        <p style="line-height: 1.5em;">Now, please enter a location name to link this MiHome Hub.</p>\n        <ion-list>\n          <ion-input type="text" [(ngModel)]="name" placeholder="Enter location name."></ion-input>\n        </ion-list>\n        <span><b>MAC Address:</b> {{hub.macaddress}}</span>\n        <br>\n        <span><b>Firmware:</b> {{hub.firmware}}</span>\n        <br>\n        <span><b>Unique HID:</b> {{hub.hubID}}</span>\n        <button ion-button full type="submit" color="themenav" (click)="configs()"><b>Link</b><ion-spinner name="bubbles" *ngIf="isSpinner"></ion-spinner></button>\n      </div>\n    </ion-card-content>\n\n\n\n  </ion-card>\n\n</ion-content>\n'/*ion-inline-end:"/Users/johnosullivan/Desktop/MiHome/MiHome_Hybrid_App/src/pages/setup/setup.html"*/, providers: [__WEBPACK_IMPORTED_MODULE_3__ionic_native_barcode_scanner__["a" /* BarcodeScanner */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_qr_scanner__["a" /* QRScanner */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__providers_user_service_user_service__["a" /* UserServiceProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_data_service_data_service__["a" /* DataProvider */], __WEBPACK_IMPORTED_MODULE_4_ng_socket_io__["Socket"], __WEBPACK_IMPORTED_MODULE_3__ionic_native_barcode_scanner__["a" /* BarcodeScanner */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_qr_scanner__["a" /* QRScanner */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
], SetupPage);

//# sourceMappingURL=setup.js.map

/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(45);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UserServiceProvider = (function () {
    function UserServiceProvider(http, storage) {
        this.http = http;
        this.storage = storage;
        storage.ready().then(function () {
        });
    }
    UserServiceProvider.prototype.saveToken = function (token) {
        this.storage.set('token', token);
    };
    UserServiceProvider.prototype.saveUser = function (user) {
        this.storage.set('user', user);
    };
    UserServiceProvider.prototype.getToken = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get('token').then(function (token) {
                resolve(token);
            });
        });
    };
    UserServiceProvider.prototype.getUser = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.get('user').then(function (user) {
                resolve(user);
            });
        });
    };
    UserServiceProvider.prototype.removeToken = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.remove('token').then(function () {
                console.log('token is removed');
                resolve(true);
            });
        });
    };
    UserServiceProvider.prototype.removeUser = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.remove('user').then(function () {
                console.log('user is removed');
                resolve(true);
            });
        });
    };
    return UserServiceProvider;
}());
UserServiceProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
], UserServiceProvider);

//# sourceMappingURL=user-service.js.map

/***/ }),

/***/ 440:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(441);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(458);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 458:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(509);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_register_register__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_about_about__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_dashboard_dashpages_tempHum__ = __webpack_require__(386);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_dashboard_dashpages_co2voc__ = __webpack_require__(387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_dashboard_dashpages_pressure__ = __webpack_require__(388);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_dashboard_dashpages_IR__ = __webpack_require__(389);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_dashboard_dashpages_uvlight__ = __webpack_require__(390);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_storage__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__WindowRef__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_status_bar__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_splash_screen__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_dashboard_dashboard__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_profile_profile__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__providers_auth_service_auth_service__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_user_service_user_service__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22_ionic2_date_picker__ = __webpack_require__(581);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_setup_setup__ = __webpack_require__(392);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_ion2_calendar__ = __webpack_require__(618);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ionic_native_camera__ = __webpack_require__(622);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__providers_data_service_data_service__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_devices_devices__ = __webpack_require__(391);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28_ng_socket_io__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_28_ng_socket_io__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





























var config = { url: 'https://pacific-springs-32410.herokuapp.com/', options: { reconnect: true } };
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_register_register__["a" /* RegisterPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_about_about__["a" /* AboutPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_dashboard_dashboard__["a" /* DashboardPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_profile_profile__["a" /* ProfilePage */],
            __WEBPACK_IMPORTED_MODULE_22_ionic2_date_picker__["a" /* DatePicker */],
            __WEBPACK_IMPORTED_MODULE_23__pages_setup_setup__["a" /* SetupPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_dashboard_dashpages_tempHum__["a" /* TempHumidityPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_dashboard_dashpages_co2voc__["a" /* CO2VOCPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_dashboard_dashpages_pressure__["a" /* PressurePage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_dashboard_dashpages_IR__["a" /* IRPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_dashboard_dashpages_uvlight__["a" /* UVLightPage */],
            __WEBPACK_IMPORTED_MODULE_27__pages_devices_devices__["a" /* DevicesPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], {
                platforms: {
                    ios: {
                        statusbarPadding: false
                    }
                }
            }, {
                links: [
                    { loadChildren: '../pages/about/about.module#AboutPageModule', name: 'AboutPage', segment: 'about', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/profile/profile.module#ProfilePageModule', name: 'ProfilePage', segment: 'profile', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_14__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_24_ion2_calendar__["a" /* CalendarModule */],
            __WEBPACK_IMPORTED_MODULE_28_ng_socket_io__["SocketIoModule"].forRoot(config)
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_register_register__["a" /* RegisterPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_about_about__["a" /* AboutPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_dashboard_dashboard__["a" /* DashboardPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_profile_profile__["a" /* ProfilePage */],
            __WEBPACK_IMPORTED_MODULE_22_ionic2_date_picker__["a" /* DatePicker */],
            __WEBPACK_IMPORTED_MODULE_23__pages_setup_setup__["a" /* SetupPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_dashboard_dashpages_tempHum__["a" /* TempHumidityPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_dashboard_dashpages_co2voc__["a" /* CO2VOCPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_dashboard_dashpages_pressure__["a" /* PressurePage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_dashboard_dashpages_IR__["a" /* IRPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_dashboard_dashpages_uvlight__["a" /* UVLightPage */],
            __WEBPACK_IMPORTED_MODULE_27__pages_devices_devices__["a" /* DevicesPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_15__WindowRef__["a" /* WindowRef */],
            __WEBPACK_IMPORTED_MODULE_16__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_17__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_20__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_21__providers_user_service_user_service__["a" /* UserServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_22_ionic2_date_picker__["a" /* DatePicker */],
            __WEBPACK_IMPORTED_MODULE_25__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_26__providers_data_service_data_service__["a" /* DataProvider */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 509:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_register_register__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_about_about__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_dashboard_dashboard__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_profile_profile__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_auth_service_auth_service__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_user_service_user_service__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_data_service_data_service__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_devices_devices__ = __webpack_require__(391);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















var MyApp = (function () {
    function MyApp(dataProvider, userServiceProvider, authServiceProvider, platform, statusBar, splashScreen, modalCtrl) {
        this.dataProvider = dataProvider;
        this.userServiceProvider = userServiceProvider;
        this.authServiceProvider = authServiceProvider;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.modalCtrl = modalCtrl;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        this.initializeApp();
        this.pages = [
            { title: 'Home', icon: 'home', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: 'Login', icon: 'log-in', component: __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */] },
            { title: 'Register', icon: 'person-add', component: __WEBPACK_IMPORTED_MODULE_6__pages_register_register__["a" /* RegisterPage */] },
            { title: 'About', icon: 'information-circle', component: __WEBPACK_IMPORTED_MODULE_7__pages_about_about__["a" /* AboutPage */] }
        ];
        this.authpages = [
            { title: 'Dashboard', icon: 'desktop', component: __WEBPACK_IMPORTED_MODULE_8__pages_dashboard_dashboard__["a" /* DashboardPage */] },
            { title: 'My Hubs', icon: 'hammer', component: __WEBPACK_IMPORTED_MODULE_13__pages_devices_devices__["a" /* DevicesPage */] },
            { title: 'My Profile', icon: 'person', component: __WEBPACK_IMPORTED_MODULE_9__pages_profile_profile__["a" /* ProfilePage */] },
            { title: 'About', icon: 'information-circle', component: __WEBPACK_IMPORTED_MODULE_7__pages_about_about__["a" /* AboutPage */] }
        ];
        var self = this;
        this.userServiceProvider.getToken().then(function (token) {
            if (token === null) {
                self.authServiceProvider.setAuth(false);
            }
            else {
                self.authServiceProvider.setAuth(true);
            }
        });
    }
    MyApp.prototype.test = function () {
        var self = this;
        this.userServiceProvider.removeToken().then(function (token) {
            self.authServiceProvider.setAuth(false);
            // self.navCtrl.setRoot(HomePage);
            self.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */]);
        });
    };
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.overlaysWebView(false);
            _this.statusBar.backgroundColorByHexString('#69b5c6');
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        var _this = this;
        if (page.title == "Login") {
            var loginModal = this.modalCtrl.create(page.component, {});
            loginModal.onDidDismiss(function (obj) {
                console.log(JSON.stringify(obj));
                if (obj.status) {
                    _this.dataProvider.devices(obj.user.id, obj.token).subscribe(function (data) {
                        if (data['data'].length != 0) {
                            _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_8__pages_dashboard_dashboard__["a" /* DashboardPage */]);
                        }
                        else {
                            _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_13__pages_devices_devices__["a" /* DevicesPage */]);
                        }
                    }, function (err) {
                    });
                }
            });
            loginModal.present();
        }
        else if (page.title == "Register") {
            var registerModal = this.modalCtrl.create(page.component, { userId: 8675309 });
            registerModal.onDidDismiss(function (obj) {
                _this.authServiceProvider.login(obj.creds).subscribe(function (data) {
                    if (data.success) {
                        console.log(data);
                        _this.userServiceProvider.saveToken(data.token);
                        _this.userServiceProvider.saveUser(data.user);
                        _this.authServiceProvider.setAuth(true);
                        _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_13__pages_devices_devices__["a" /* DevicesPage */]);
                    }
                    else {
                    }
                }, function (err) {
                    console.log(JSON.stringify(err._body));
                }, function () { return console.log('Auto Logging in....'); });
            });
            registerModal.present();
        }
        else {
            this.nav.setRoot(page.component);
        }
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */])
], MyApp.prototype, "nav", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('navCtrl'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */])
], MyApp.prototype, "navCtrl", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/johnosullivan/Desktop/MiHome/MiHome_Hybrid_App/src/app/app.html"*/'<ion-menu [content]="content">\n    <ion-header>\n      <ion-toolbar color="menutheme">\n        <ion-title>Mi Home</ion-title>\n      </ion-toolbar>\n    </ion-header>\n    <ion-content>\n      <div *ngIf="!authServiceProvider.isLogin">\n        <ion-list>\n          <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n            <ion-icon item-left name={{p.icon}}></ion-icon> {{p.title}}\n          </button>\n        </ion-list>\n      </div>\n      <div *ngIf="authServiceProvider.isLogin">\n        <ion-list>\n        <button menuClose ion-item *ngFor="let p of authpages" (click)="openPage(p)">\n          <ion-icon item-left name={{p.icon}}></ion-icon> {{p.title}}\n        </button>\n        <button menuClose ion-item class="submit-btn" type="submit" color="menutheme" (click)="test()">\n          <ion-icon item-left name="log-out"></ion-icon>Logoff\n        </button>\n        </ion-list>\n      </div>\n  </ion-content>\n  \n    </ion-menu>\n  \n  <ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/Users/johnosullivan/Desktop/MiHome/MiHome_Hybrid_App/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_12__providers_data_service_data_service__["a" /* DataProvider */],
        __WEBPACK_IMPORTED_MODULE_11__providers_user_service_user_service__["a" /* UserServiceProvider */],
        __WEBPACK_IMPORTED_MODULE_10__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 538:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 269,
	"./af.js": 269,
	"./ar": 270,
	"./ar-dz": 271,
	"./ar-dz.js": 271,
	"./ar-kw": 272,
	"./ar-kw.js": 272,
	"./ar-ly": 273,
	"./ar-ly.js": 273,
	"./ar-ma": 274,
	"./ar-ma.js": 274,
	"./ar-sa": 275,
	"./ar-sa.js": 275,
	"./ar-tn": 276,
	"./ar-tn.js": 276,
	"./ar.js": 270,
	"./az": 277,
	"./az.js": 277,
	"./be": 278,
	"./be.js": 278,
	"./bg": 279,
	"./bg.js": 279,
	"./bn": 280,
	"./bn.js": 280,
	"./bo": 281,
	"./bo.js": 281,
	"./br": 282,
	"./br.js": 282,
	"./bs": 283,
	"./bs.js": 283,
	"./ca": 284,
	"./ca.js": 284,
	"./cs": 285,
	"./cs.js": 285,
	"./cv": 286,
	"./cv.js": 286,
	"./cy": 287,
	"./cy.js": 287,
	"./da": 288,
	"./da.js": 288,
	"./de": 289,
	"./de-at": 290,
	"./de-at.js": 290,
	"./de-ch": 291,
	"./de-ch.js": 291,
	"./de.js": 289,
	"./dv": 292,
	"./dv.js": 292,
	"./el": 293,
	"./el.js": 293,
	"./en-au": 294,
	"./en-au.js": 294,
	"./en-ca": 295,
	"./en-ca.js": 295,
	"./en-gb": 296,
	"./en-gb.js": 296,
	"./en-ie": 297,
	"./en-ie.js": 297,
	"./en-nz": 298,
	"./en-nz.js": 298,
	"./eo": 299,
	"./eo.js": 299,
	"./es": 300,
	"./es-do": 301,
	"./es-do.js": 301,
	"./es.js": 300,
	"./et": 302,
	"./et.js": 302,
	"./eu": 303,
	"./eu.js": 303,
	"./fa": 304,
	"./fa.js": 304,
	"./fi": 305,
	"./fi.js": 305,
	"./fo": 306,
	"./fo.js": 306,
	"./fr": 307,
	"./fr-ca": 308,
	"./fr-ca.js": 308,
	"./fr-ch": 309,
	"./fr-ch.js": 309,
	"./fr.js": 307,
	"./fy": 310,
	"./fy.js": 310,
	"./gd": 311,
	"./gd.js": 311,
	"./gl": 312,
	"./gl.js": 312,
	"./gom-latn": 313,
	"./gom-latn.js": 313,
	"./he": 314,
	"./he.js": 314,
	"./hi": 315,
	"./hi.js": 315,
	"./hr": 316,
	"./hr.js": 316,
	"./hu": 317,
	"./hu.js": 317,
	"./hy-am": 318,
	"./hy-am.js": 318,
	"./id": 319,
	"./id.js": 319,
	"./is": 320,
	"./is.js": 320,
	"./it": 321,
	"./it.js": 321,
	"./ja": 322,
	"./ja.js": 322,
	"./jv": 323,
	"./jv.js": 323,
	"./ka": 324,
	"./ka.js": 324,
	"./kk": 325,
	"./kk.js": 325,
	"./km": 326,
	"./km.js": 326,
	"./kn": 327,
	"./kn.js": 327,
	"./ko": 328,
	"./ko.js": 328,
	"./ky": 329,
	"./ky.js": 329,
	"./lb": 330,
	"./lb.js": 330,
	"./lo": 331,
	"./lo.js": 331,
	"./lt": 332,
	"./lt.js": 332,
	"./lv": 333,
	"./lv.js": 333,
	"./me": 334,
	"./me.js": 334,
	"./mi": 335,
	"./mi.js": 335,
	"./mk": 336,
	"./mk.js": 336,
	"./ml": 337,
	"./ml.js": 337,
	"./mr": 338,
	"./mr.js": 338,
	"./ms": 339,
	"./ms-my": 340,
	"./ms-my.js": 340,
	"./ms.js": 339,
	"./my": 341,
	"./my.js": 341,
	"./nb": 342,
	"./nb.js": 342,
	"./ne": 343,
	"./ne.js": 343,
	"./nl": 344,
	"./nl-be": 345,
	"./nl-be.js": 345,
	"./nl.js": 344,
	"./nn": 346,
	"./nn.js": 346,
	"./pa-in": 347,
	"./pa-in.js": 347,
	"./pl": 348,
	"./pl.js": 348,
	"./pt": 349,
	"./pt-br": 350,
	"./pt-br.js": 350,
	"./pt.js": 349,
	"./ro": 351,
	"./ro.js": 351,
	"./ru": 352,
	"./ru.js": 352,
	"./sd": 353,
	"./sd.js": 353,
	"./se": 354,
	"./se.js": 354,
	"./si": 355,
	"./si.js": 355,
	"./sk": 356,
	"./sk.js": 356,
	"./sl": 357,
	"./sl.js": 357,
	"./sq": 358,
	"./sq.js": 358,
	"./sr": 359,
	"./sr-cyrl": 360,
	"./sr-cyrl.js": 360,
	"./sr.js": 359,
	"./ss": 361,
	"./ss.js": 361,
	"./sv": 362,
	"./sv.js": 362,
	"./sw": 363,
	"./sw.js": 363,
	"./ta": 364,
	"./ta.js": 364,
	"./te": 365,
	"./te.js": 365,
	"./tet": 366,
	"./tet.js": 366,
	"./th": 367,
	"./th.js": 367,
	"./tl-ph": 368,
	"./tl-ph.js": 368,
	"./tlh": 369,
	"./tlh.js": 369,
	"./tr": 370,
	"./tr.js": 370,
	"./tzl": 371,
	"./tzl.js": 371,
	"./tzm": 372,
	"./tzm-latn": 373,
	"./tzm-latn.js": 373,
	"./tzm.js": 372,
	"./uk": 374,
	"./uk.js": 374,
	"./ur": 375,
	"./ur.js": 375,
	"./uz": 376,
	"./uz-latn": 377,
	"./uz-latn.js": 377,
	"./uz.js": 376,
	"./vi": 378,
	"./vi.js": 378,
	"./x-pseudo": 379,
	"./x-pseudo.js": 379,
	"./yo": 380,
	"./yo.js": 380,
	"./zh-cn": 381,
	"./zh-cn.js": 381,
	"./zh-hk": 382,
	"./zh-hk.js": 382,
	"./zh-tw": 383,
	"./zh-tw.js": 383
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 538;

/***/ }),

/***/ 578:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 73:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthServiceProvider = (function () {
    function AuthServiceProvider(http) {
        this.http = http;
        this.isLogin = false;
    }
    AuthServiceProvider.prototype.setAuth = function (status) {
        this.isLogin = status;
    };
    AuthServiceProvider.prototype.login = function (params) {
        var body = JSON.stringify(params);
        var head = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        return this.http.post("http://pacific-springs-32410.herokuapp.com/api/user/authenticate", body, { headers: head }).map(function (res) { return res.json(); });
    };
    AuthServiceProvider.prototype.register = function (params) {
        var body = JSON.stringify(params);
        var head = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        return this.http.post("http://pacific-springs-32410.herokuapp.com/api/user/register", body, { headers: head }).map(function (res) { return res.json(); });
    };
    return AuthServiceProvider;
}());
AuthServiceProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
], AuthServiceProvider);

//# sourceMappingURL=auth-service.js.map

/***/ }),

/***/ 75:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__user_service_user_service__ = __webpack_require__(44);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DataProvider = (function () {
    function DataProvider(http, userServiceProvider) {
        this.http = http;
        this.userServiceProvider = userServiceProvider;
    }
    DataProvider.prototype.chartdata = function (start, end, token) {
        console.log("Start: " + start);
        console.log("End: " + end);
        console.log("Token: " + token);
        var payload = {
            "nodeID": "",
            "start": "2017-11-04T19:08:08.041Z",
            "end": "2017-11-04T19:52:09.289Z",
            "token": token
        };
        var body = JSON.stringify(payload);
        var head = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        return this.http.post("http://pacific-springs-32410.herokuapp.com/api/data/find", body, { headers: head }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.devices = function (id, token) {
        var body = JSON.stringify({ 'userID': id, 'token': token });
        console.log(body);
        var head = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        return this.http.post("http://pacific-springs-32410.herokuapp.com/api/hardware/devices", body, { headers: head }).map(function (res) { return res.json(); });
    };
    DataProvider.prototype.link = function (payload) {
        var body = JSON.stringify(payload);
        var head = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        return this.http.post("http://pacific-springs-32410.herokuapp.com/api/hardware/add", body, { headers: head }).map(function (res) { return res.json(); });
    };
    return DataProvider;
}());
DataProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_3__user_service_user_service__["a" /* UserServiceProvider */]])
], DataProvider);

//# sourceMappingURL=data-service.js.map

/***/ })

},[440]);
//# sourceMappingURL=main.js.map