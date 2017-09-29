import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Storage} from '@ionic/storage';

@Injectable()
export class UserServiceProvider {

  constructor(public http: Http,public storage:Storage) {
    storage.ready().then(() => {
      //console.log("Storage Ready!");
    });
  }

  saveToken(token) {
    //console.log("Saving token...", token);
    this.storage.set('token',token);
  }

  getToken(){
    return new Promise<string>((resolve, reject) => {
      this.storage.get('token').then(token=>{
    	   //console.log('token: '+ token);
         resolve(token);
      });
    });
  }

  removeToken(){
    return new Promise<boolean>((resolve, reject) => {
      this.storage.remove('token').then(()=>{
        console.log('token is removed');
        resolve(true);
      });
    });
  }

}
