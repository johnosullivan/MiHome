import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Storage} from '@ionic/storage';

@Injectable()
export class UserServiceProvider {

  constructor(public http: Http,public storage:Storage) {
    storage.ready().then(() => {
    });
  }

  saveToken(token) {
    this.storage.set('token',token);
  }

  saveUser(user) {
    this.storage.set('user',user);
  }

  getToken(){
    return new Promise<string>((resolve, reject) => {
      this.storage.get('token').then(token=>{
         resolve(token);
      });
    });
  }

  getUser(){
    return new Promise<string>((resolve, reject) => {
      this.storage.get('user').then(user=>{
         resolve(user);
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

  removeUser(){
    return new Promise<boolean>((resolve, reject) => {
      this.storage.remove('user').then(()=>{
        console.log('user is removed');
        resolve(true);
      });
    });
  }

}
