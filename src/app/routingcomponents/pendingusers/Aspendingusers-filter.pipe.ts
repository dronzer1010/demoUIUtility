import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'aspendingusersfilter'
})
export class AspendingusersFilterPipe implements PipeTransform {
    transform(items: any[], supplierName: string, supplierdesignation: string, department: string , role: string){
        if (items && items.length){
            return items.filter(item =>{
                if (supplierName && item.employeename.toLowerCase().indexOf(supplierName.toLowerCase()) === -1){
                    return false;
                }
                if (supplierdesignation && item.designation.toLowerCase().indexOf(supplierdesignation.toLowerCase()) === -1){
                    return false;
                }
                if (department && item.department.toLowerCase().indexOf(department.toLowerCase()) === -1){
                    return false;
                }
                if (role && item.role.toLowerCase().indexOf(role.toLowerCase()) === -1){
                    return false;
                }
                return true;
           })
        }
        else{
            return items;
        }
    }
}