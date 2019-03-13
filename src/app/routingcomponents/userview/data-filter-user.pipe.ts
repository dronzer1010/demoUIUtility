import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'dataFilter'
})
export class DataFilterPipeUser implements PipeTransform {
    transform(items: any[], supplierName: string, description: string, department: string , role: string, status: string){
        if (items && items.length){
            return items.filter(item =>{
                if (supplierName && item.employeename.toLowerCase().indexOf(supplierName.toLowerCase()) === -1){
                    return false;
                }
                if (description && item.designation.toLowerCase().indexOf(description.toLowerCase()) === -1){
                    return false;
                }
                if (department && item.department.toLowerCase().indexOf(department.toLowerCase()) === -1){
                    return false;
                }
                if (role && item.role.toLowerCase().indexOf(role.toLowerCase()) === -1){
                    return false;
                }
                if (status && item.status.toLowerCase().indexOf(status.toLowerCase()) === -1){
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