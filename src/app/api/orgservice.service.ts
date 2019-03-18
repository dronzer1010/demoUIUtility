import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// import { Observable, of, throwError } from 'rxjs';
// import { catchError, tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Config} from '../config'
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const path = new Config().getBaseURL();
@Injectable({
  providedIn: 'root'
})
export class OrgserviceService {

  constructor(private http: HttpClient) { }

  getOrganisation(){
    return this.http.get<any>(path+'/ccadmin/organizations')
  }
}
