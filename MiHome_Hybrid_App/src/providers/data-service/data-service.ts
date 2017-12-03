import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { UserServiceProvider } from '../user-service/user-service';

@Injectable()
export class DataProvider {

  constructor(public http: Http,public userServiceProvider:UserServiceProvider) {

  }

  chartdata(start,end,token) {
    console.log("Start: " + start);
    console.log("End: " + end);
    console.log("Token: " + token);
    var payload = {
	     "nodeID":"",
       "start": "2017-11-04T19:08:08.041Z",
       "end":"2017-11-04T19:52:09.289Z",
       "token": token
    };
    let body = JSON.stringify(payload);
    let head = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post("http://pacific-springs-32410.herokuapp.com/api/data/find", body,
    { headers : head }).map(res =>  res.json());
  }

  devices(id,token) {
    let body = JSON.stringify({'userID':id,'token':token});
    console.log(body);
    let head = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post("http://pacific-springs-32410.herokuapp.com/api/hardware/devices", body, { headers : head }).map(res =>  res.json());
  }

  link(payload) {
    let body = JSON.stringify(payload);
    let head = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post("http://pacific-springs-32410.herokuapp.com/api/hardware/add", body, { headers : head }).map(res =>  res.json());
  }


}
