import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {

    constructor() { }

    setData(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    getData(key: any): any {
        return JSON.parse(localStorage.getItem(key));
    }
}