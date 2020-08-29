import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionService } from '../../sessionservice/storage.service';
import {Config} from '../../config'

const path = new Config().getBaseURL();
@Injectable()
export class NotificationMatrixService {

    private asGetNotificationUrl = path+'/Notification/notificationedit';
    private asSendNotificationUrl = path+'/Notification/savenotification';
    constructor(private http: HttpClient, private storage: SessionService) { }

    getNotificationDetails(): Promise<any> {
        // let token = this.storage.getData("chlogin_data").token;
        // let headers = new HttpHeaders().set('Content-Type', 'application/json')
        //     .set('authorization', 'Bearer ' + token);
        // let options = { headers: headers };
        let promise = new Promise((resolve, reject) => {
            this.http.get(this.asGetNotificationUrl)
                .subscribe(
                    res => {
                        console.log(res);
                        resolve(res);
                    },
                    err => {
                        console.log("Error occured : " + err);
                        reject(err);
                    }
                );

        });

        return promise;
    }

    sendNotificationDetails(regdetails: any): Promise<any> {
        // let token = this.storage.getData("chlogin_data").token;
        // let headers = new HttpHeaders().set('Content-Type', 'application/json')
        //     .set('authorization', 'Bearer ' + token);
        // let options = { headers: headers };
        let promise = new Promise((resolve, reject) => {
            // let paramsValue = {
            //     "paymentsasms" : 1,
            //     "paymentsrotp": 3
            // };
            this.http.post(this.asSendNotificationUrl, regdetails)
                .subscribe(
                    res => {
                        console.log(res);
                        resolve(res);
                    },
                    err => {
                        console.log("Error occured : " + err);
                        reject(err);
                    }
                );
        });
        return promise;
    }

}

