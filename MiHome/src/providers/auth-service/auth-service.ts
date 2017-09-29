import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthServiceProvider {

  constructor(public http: Http) {



  }

  login(params) {
    let body = JSON.stringify(params);
    let head = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post("http://localhost:8888/api/user/authenticate", body, { headers : head }).map(res =>  res.json());
  }

}
