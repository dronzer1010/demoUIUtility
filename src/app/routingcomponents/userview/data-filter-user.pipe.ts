import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'dataFilter'
})
export class DataFilterPipeUser implements PipeTransform {
    transform(items: any[], supplierName: string, description: string, department: string , role: string, status: string,empid:string,group:string,dob:string,mobileno:string,landlineno:string,email:string,uploadfilename:string,initiateddate:string,initiatedby:string,approveddate:string,approvedby:string){
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
                if (empid && item.empid.toLowerCase().indexOf(empid.toLowerCase()) === -1){
                    return false;
                }
                if (group && item.group.toLowerCase().indexOf(group.toLowerCase()) === -1){
                    return false;
                }
                if (dob && item.dob.toLowerCase().indexOf(dob.toLowerCase()) === -1){
                    return false;
                }
                if (mobileno && item.mobileno.toLowerCase().indexOf(mobileno.toLowerCase()) === -1){
                    return false;
                }
                if (landlineno && item.landlineno.toLowerCase().indexOf(landlineno.toLowerCase()) === -1){
                    return false;
                }
                if (email && item.email.toLowerCase().indexOf(email.toLowerCase()) === -1){
                    return false;
                }
                if (uploadfilename && item.uploadfilename.toLowerCase().indexOf(uploadfilename.toLowerCase()) === -1){
                    return false;
                }
                if (initiateddate && item.initiateddate.toLowerCase().indexOf(initiateddate.toLowerCase()) === -1){
                    return false;
                }
                if (initiatedby && item.initiatedby.toLowerCase().indexOf(initiatedby.toLowerCase()) === -1){
                    return false;
                }
                if (approveddate && item.approveddate.toLowerCase().indexOf(approveddate.toLowerCase()) === -1){
                    return false;
                }
                if (approvedby && item.approvedby.toLowerCase().indexOf(approvedby.toLowerCase()) === -1){
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