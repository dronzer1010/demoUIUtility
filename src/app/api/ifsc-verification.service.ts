import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class IfscVerificationService{

    constructor(private http: HttpClient) { }
  
    getIfscDetails(ifsc){
         return this.http.get('https://ifsc.aquapay.in/api/ifsc/'+ifsc);
    }
}