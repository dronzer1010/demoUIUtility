import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'dataFilter'
})
export class DataFilterPipeUser implements PipeTransform {
    // transform(items: any[], supplierName: string, description: string, department: string , role: string, status: string,empid:string,group:string,dob:string,mobileno:string,landlineno:string,email:string,uploadfilename:string,initiateddate:string,initiatedby:string,approveddate:string,approvedby:string){
        
    //     if (items && items.length){
    //         return items.filter(item =>{
    //             if (supplierName && item.employeename.toLowerCase().indexOf(supplierName.toLowerCase()) === -1){
    //                 return false;
    //             }
    //             if (description && item.designation.toLowerCase().indexOf(supplierName.toLowerCase()) === -1){
    //                 return false;
    //             }
    //             if (department && item.department.toLowerCase().indexOf(supplierName.toLowerCase()) === -1){
    //                 return false;
    //             }
    //             if (role && item.role.toLowerCase().indexOf(supplierName.toLowerCase()) === -1){
    //                 return false;
    //             }
    //             if (empid && item.empid.toLowerCase().indexOf(supplierName.toLowerCase()) === -1){
    //                 return false;
    //             }
    //             if (group && item.group.toLowerCase().indexOf(supplierName.toLowerCase()) === -1){
    //                 return false;
    //             }
    //             if (dob && item.dob.toLowerCase().indexOf(supplierName.toLowerCase()) === -1){
    //                 return false;
    //             }
    //             if (mobileno && item.mobileno.toLowerCase().indexOf(supplierName.toLowerCase()) === -1){
    //                 return false;
    //             }
    //             if (landlineno && item.landlineno.toLowerCase().indexOf(supplierName.toLowerCase()) === -1){
    //                 return false;
    //             }
    //             if (email && item.email.toLowerCase().indexOf(supplierName.toLowerCase()) === -1){
    //                 return false;
    //             }
    //             if (uploadfilename && item.uploadfilename.toLowerCase().indexOf(supplierName.toLowerCase()) === -1){
    //                 return false;
    //             }
    //             if (initiateddate && item.initiateddate.toLowerCase().indexOf(supplierName.toLowerCase()) === -1){
    //                 return false;
    //             }
    //             if (initiatedby && item.initiatedby.toLowerCase().indexOf(supplierName.toLowerCase()) === -1){
    //                 return false;
    //             }
    //             if (approveddate && item.approveddate.toLowerCase().indexOf(supplierName.toLowerCase()) === -1){
    //                 return false;
    //             }
    //             if (approvedby && item.approvedby.toLowerCase().indexOf(supplierName.toLowerCase()) === -1){
    //                 return false;
    //             }
    //             if (status && item.status.toLowerCase().indexOf(supplierName.toLowerCase()) === -1){
    //                 return false;
    //             }
    //             return true;
    //        })
    //     }
    //     else{
    //         return items;
    //     }
    // }
    transform(items: any, filter: any, defaultFilter: boolean): any {
        if (!filter){
          return items;
        }
    
        if (!Array.isArray(items)){
          return items;
        }
    
        if (filter && Array.isArray(items)) {
          let filterKeys = Object.keys(filter);
    
          if (defaultFilter) {
            return items.filter(item =>
                filterKeys.reduce((x, keyName) =>
                    (x && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] == "", true));
          }
          else {
            return items.filter(item => {
              return filterKeys.some((keyName) => {
                return new RegExp(filter[keyName], 'gi').test(item[keyName]) || filter[keyName] == "";
              });
            });
          }
        }
      }
}