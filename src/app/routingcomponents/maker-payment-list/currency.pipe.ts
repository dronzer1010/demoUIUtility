import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
@Pipe({ name: 'CustomeCurrency' })
export class CustomCurrencyPipe implements PipeTransform {

constructor(private currencyPipe: CurrencyPipe) { }

transform(val: number): string {
   // Format the output to display any way you want here.
   // For instance:
   if (val !== undefined && val !== null) {
     return val.toLocaleString(/*arguments you need*/);
   } else {
     return '';
   }
 }
}