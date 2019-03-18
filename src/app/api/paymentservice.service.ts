import { Injectable } from '@angular/core';
import {Config} from '../config'
@Injectable({
  providedIn: 'root'
})
export class PaymentserviceService {
  path = new Config().getutilityBaseUrl();
  constructor() { }
}
