import { Component, OnInit } from '@angular/core';
import{LoaderService} from '../../api/loader.service';
import { Users } from '../../models/users';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { DatepickerOptions } from 'ng2-datepicker';
import * as frLocale from 'date-fns/locale/fr';
import { DatePipe } from '@angular/common'
@Component({
  selector: 'app-userunitary',
  templateUrl: './userunitary.component.html',
  styleUrls: ['./userunitary.component.css']
})
export class UserunitaryComponent implements OnInit {
  model: any = {};
  dateofbirth:any;
  step1:boolean=true;
  step2:boolean=false;
  step3:boolean=false;
  step4:boolean=false;
  isComplexOrg:boolean=true;
  tabspermit:boolean=true
  billappr:boolean=false;
  billuni:boolean=false;
  billbulk:boolean=false;
  billview:boolean=false;
  payappr:boolean=false;
  payuni:boolean=false;
  paybulk:boolean=false;
  payview:boolean=false;
  usrappr:boolean=false;
  usruni:boolean=false;
  usrbulk:boolean=false;
  usrview:boolean=false;
  crdappr:boolean=false;
  crduni:boolean=false;
  crdview:boolean=false;
  grpappr:boolean=false;
  grpuni:boolean=false;
  grpview:boolean=false;
  rulappr:boolean=false;
  ruluni:boolean=false;
  rulview:boolean=false;
  currentUser: Users;
  next1:boolean=false;
  usergroups:any=[];
  //viewsup:boolean=false;
  viewbilltab:boolean=false;
  viewpaytab:boolean=false;
  viewusrtab:boolean=false;
  viewcrdtab:boolean=false;
  viewgrptab:boolean=false;
  viewruletab:boolean=false;
  unibilltab:boolean=false;
  unipaytab:boolean=false;
  uniusrtab:boolean=false;
  unicrdtab:boolean=false;
  unigrptab:boolean=false;
  uniruletab:boolean=false;
  bulkbilltab:boolean=false;
  bulkpaytab:boolean=false;
  bulkusrtab:boolean=false;
  apprbilltab:boolean=false;
  apprpaytab:boolean=false;
  apprusrtab:boolean=false;
  apprcrdtab:boolean=false;
  apprgrptab:boolean=false;
  apprruletab:boolean=false;
 //formatDate(value:string|number|Date,format:string, locale:string,timezone?:string):string;
  dateModel:string
  groups:any=[];
  submitted = false;
  groupname:string;
  date:Date = new Date();
  settings = {
    bigBanner: true,
    timePicker: false,
    format: 'dd-MM-yyyy',
    defaultOpen: false
}
//   public myDatePickerOptions: IMyDpOptions = {
//     // other options...
//     dateFormat: 'dd-mm-yyyy',
// };
  constructor(private router: Router,private loaderService: LoaderService,private toastr: ToastrService,public datepipe: DatePipe) { }

  ngOnInit() {
    this.loadAllGroups()
    this.model['dob']=this.date;
  }

  gotostep2(){
    this.step1=false;
    this.step2=true;
    this.step3=false;
  }

  gotostep1(){
    this.step1=true;
    this.step2=false;
    this.step3=false;
  }

  gotostep3(){
    this.step1=false;
    this.step2=false;
    this.step3=true;
  }

  getSelectedTabs(){
    this.model['isview']={}
    if(this.viewbilltab){
      this.model['isview']['viewsup']=28
    }
    if(this.viewpaytab){
      this.model['isview']['viewpay']=19
    }
    if(this.viewusrtab){
      this.model['isview']['viewuser']=17
    }
    if(this.viewcrdtab){
      this.model['isview']['viewcard']=23
    }
    if(this.viewgrptab){
      this.model['isview']['viewgroup']=54
    }
    if(this.viewruletab){
      this.model['isview']['viewrule']=39
    }
    if(this.apprbilltab){
      this.model['isview']['approvesup']=74
    }
    if(this.apprpaytab){
      this.model['isview']['approvepay']=75
    }
    if(this.apprusrtab)
    this.model['isview']['approveuser']=76
    if(this.apprcrdtab)
    this.model['isview']['approvecard']=77
    if(this.apprgrptab)
    this.model['isview']['approvegroup']=80
    if(this.apprruletab)
    this.model['isview']['approverule']=79
    if(this.unibilltab)
    this.model['isview']['unisup']=27
    if(this.unipaytab)
    this.model['isview']['unipay']=20
    if(this.uniusrtab)
    this.model['isview']['uniuser']=6
    if(this.unicrdtab)
    this.model['isview']['unicard']=24
    if(this.unigrptab)
    this.model['isview']['unigroup']=53
    if(this.uniruletab)
    this.model['isview']['unirule']=40
    if(this.bulkbilltab)
    this.model['isview']['bulksup']=51
    if(this.bulkpaytab)
    this.model['isview']['bulkpay']=21
    console.log(this.model['isview'])
    var tabspermitarr = []
    for(var key in this.model['isview'])
    tabspermitarr.push(parseInt(this.model['isview'][key]));
    console.log(tabspermitarr);
    this.billappr = this.contains.call(tabspermitarr,74)
    this.billuni=this.contains.call(tabspermitarr,27)
    this.billbulk=this.contains.call(tabspermitarr,51)
    this.billview=this.contains.call(tabspermitarr,28)
    this.payappr=this.contains.call(tabspermitarr,75)
    this.payuni=this.contains.call(tabspermitarr,20)
    this.paybulk=this.contains.call(tabspermitarr,21)
    this.payview=this.contains.call(tabspermitarr,19)
    this.usrappr=this.contains.call(tabspermitarr,76)
    this.usrbulk=this.contains.call(tabspermitarr,7)
    this.usruni=this.contains.call(tabspermitarr,6)
    this.usrview=this.contains.call(tabspermitarr,17)
    this.crdappr=this.contains.call(tabspermitarr,77)
    this.crduni=this.contains.call(tabspermitarr,24)
    this.crdview=this.contains.call(tabspermitarr,23)
    this.grpappr=this.contains.call(tabspermitarr,80)
    this.grpuni=this.contains.call(tabspermitarr,53)
    this.grpview=this.contains.call(tabspermitarr,54)
    this.rulappr=this.contains.call(tabspermitarr,79)
    this.ruluni=this.contains.call(tabspermitarr,40)
    this.rulview=this.contains.call(tabspermitarr,39)
    // console.log("crdappr:"+this.crdappr);
  }

  contains(needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;

    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;

            for(i = 0; i < this.length; i++) {
                var item = this[i];

                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }

    return indexOf.call(this, needle) > -1;
};

private loadAllGroups() {

  this.groups=[
    {"lwrlimit":0.0,"grpname":"A","id":97,"uprlimit":1.0E8,"users":["Mr. Thirumurugan J","Ms. Nalini L"],"status":"Approved"},
    {"lwrlimit":0.0,"grpname":"B","id":98,"uprlimit":1.0E8,"users":["Ms. Meena A","Mr. Ravi Kumar"],"status":"Approved"},
    {"lwrlimit":0.0,"grpname":"C","id":99,"uprlimit":1.0E8,"users":[],"status":"Approved"},
    {"lwrlimit":0.0,"grpname":"D","id":100,"uprlimit":0.0,"users":[],"status":"Approved"},
    {"lwrlimit":0.0,"grpname":"E","id":101,"uprlimit":0.0,"users":[],"status":"Approved"}]

    if(!!this.groups){
      this.usergroups=[];
      for(var i=0; i<this.groups.length;i++){
        if(this.groups[i].status == 'Approved'){
            this.usergroups.push(this.groups[i]);
        }
    }
    }
  
  // this.groupservice.getAll().subscribe(groups => {
  //   //console.log(groups);
  //   this.groups = groups['data']; 
  //   if(!!this.groups){
  //     this.usergroups=[];
  //     for(var i=0; i<this.groups.length;i++){
  //       if(this.groups[i].status == 'Approved'){
  //           this.usergroups.push(this.groups[i]);
  //       }
  //   }
  //   }
  //    console.log(this.groups);
  //    console.log("Complex Org:"+this.isComplexOrg)
  //   });
}

validateMobileNo(value){    
  var k = value.keyCode;
        return ((k >= 48 && k <= 57) || k == 8);
}

checkValInArray(tabid:string , tab_array:string[]){
  return (tab_array.indexOf(tabid)==-1)?false:true;
}
getGroup(gname:any,id:number){
  console.log(gname)
  console.log(id)
  this.groupname="";
  for(let data of gname){
    if(data['id']==id){
      this.groupname=data['grpname']
    }
  }
  console.log(this.groupname)
}

resettabs(){
  this.model['isview']={}
  this.viewbilltab=false
  this.viewpaytab=false
  this.viewusrtab=false
  this.viewcrdtab=false
  this.viewgrptab=false
  this.viewruletab=false
  this.apprbilltab=false
  this.apprpaytab=false
  this.apprusrtab=false
  this.apprcrdtab=false
  this.apprgrptab=false
  this.apprruletab=false
  this.unibilltab=false
  this.unipaytab=false
  this.uniusrtab=false
  this.unicrdtab=false
  this.unigrptab=false
  this.uniruletab=false
  this.bulkbilltab=false
  this.bulkpaytab=false
  this.bulkusrtab=false
 
}


setDefaultPriv(role:any){
  console.log(role)
  if(role==2){
    this.resettabs()
    this.viewbilltab=true;
    this.model['isview']['viewsup']=28
    this.viewpaytab=true;
    this.model['isview']['viewpay']=19
    this.viewusrtab=true;
    this.model['isview']['viewuser']=17
    this.viewcrdtab=true;
    this.model['isview']['viewcard']=23
    this.viewgrptab=true;
    this.model['isview']['viewgroup']=54
    this.viewruletab=true;
    this.model['isview']['viewrule']=39
    this.apprusrtab=true;
    this.model['isview']['approveuser']=76
    this.apprcrdtab=true;
    this.model['isview']['approvecard']=77
    this.apprgrptab=true;
    this.model['isview']['approvegroup']=80
    this.apprruletab=true;
    this.model['isview']['approverule']=79
    }else if(role==3){
      this.resettabs()
    this.viewusrtab=true;
    this.model['isview']['viewuser']=17
    this.viewcrdtab=true;
    this.model['isview']['viewcard']=23
    this.viewgrptab=true;
    this.model['isview']['viewgroup']=54
    this.viewruletab=true;
    this.model['isview']['viewrule']=39
    this.uniusrtab=true;
    this.model['isview']['uniuser']=6
    this.unicrdtab=true;
    this.model['isview']['unicard']=24
    this.unigrptab=true;
    this.model['isview']['unigroup']=53
    this.uniruletab=true;
    this.model['isview']['unirule']=40
    this.bulkusrtab=true;
    this.model['isview']['bulkuser']=7
  }else if(role==4){
    this.resettabs()
    this.viewbilltab=true;
    this.model['isview']['viewsup']=28
    this.viewpaytab=true;
    this.model['isview']['viewpay']=19
    this.viewcrdtab=true;
    this.model['isview']['viewcard']=23
    this.unibilltab=true;
    this.model['isview']['unisup']=27
    this.unipaytab=true;
    this.model['isview']['unipay']=20
    this.bulkbilltab=true;
    this.model['isview']['bulksup']=51
    this.bulkpaytab=true;
    this.model['isview']['bulkpay']=21
  }else if(role==6){
    //this.model['isview']={}
    this.resettabs()
    this.viewbilltab=true;
    this.model['isview']['viewsup']=28
    this.viewpaytab=true;
    this.model['isview']['viewpay']=19
    this.viewcrdtab=true;
    this.model['isview']['viewcard']=23
    this.apprbilltab=true;
    this.model['isview']['approvesup']=74
    this.apprpaytab=true;
    this.model['isview']['approvepay']=75
  }
  console.log(this.model['isview'])
}

userselectedtab(){
  this.model['isview']={}
  if(this.viewbilltab){
    this.model['isview']['viewsup']=28
  }
  if(this.viewpaytab){
    this.model['isview']['viewpay']=19
  }
  if(this.viewusrtab){
    this.model['isview']['viewuser']=17
  }
  if(this.viewcrdtab){
    this.model['isview']['viewcard']=23
  }
  if(this.viewgrptab){
    this.model['isview']['viewgroup']=54
  }
  if(this.viewruletab){
    this.model['isview']['viewrule']=39
  }
  if(this.apprbilltab){
    this.model['isview']['approvesup']=74
  }
  if(this.apprpaytab){
    this.model['isview']['approvepay']=75
  }
  if(this.apprusrtab)
  this.model['isview']['approveuser']=76
  if(this.apprcrdtab)
  this.model['isview']['approvecard']=77
  if(this.apprgrptab)
  this.model['isview']['approvegroup']=80
  if(this.apprruletab)
  this.model['isview']['approverule']=79
  if(this.unibilltab)
  this.model['isview']['unisup']=27
  if(this.unipaytab)
  this.model['isview']['unipay']=20
  if(this.uniusrtab)
  this.model['isview']['uniuser']=6
  if(this.unicrdtab)
  this.model['isview']['unicard']=24
  if(this.unigrptab)
  this.model['isview']['unigroup']=53
  if(this.uniruletab)
  this.model['isview']['unirule']=40
  if(this.bulkbilltab)
  this.model['isview']['bulksup']=51
  if(this.bulkpaytab)
  this.model['isview']['bulkpay']=21
}


onSubmit() {
  this.model['dob']=this.datepipe.transform(this.model['dob'], 'yyyy-MM-dd');
  this.loaderService.display(true);
  let obj: any = {};

  var isview_arr =[];
  console.log(this.model['isview'])
  for(var key in this.model['isview'])
    isview_arr.push(parseInt(this.model['isview'][key]));
    this.model['isview'] = isview_arr;
    console.log(this.model)
  //   this.userservice.create(this.model).subscribe(
  //   data=>{
  //     if(data==null){
  //       this.loaderService.display(false);
  //       this.toastr.warning("Failed to Register!",'Alert',{
  //         timeOut:3000,
  //         positionClass:'toast-top-center'
  //         })
  //       this.router.navigate(['/main/unitaryuser']);
  //     }else{
  //       this.loaderService.display(false);
  //       console.log(data)

  //       this.router.navigate(['/main/successmsg'],{queryParams:{msg:'usersuccess'}});
  //     }
  //   },error => {
  //     console.log("Failed to Register")
  //     console.log(error)
  //     this.loaderService.display(false);
  // })
  //console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.model['isview']));
  this.loaderService.display(false);
  this.router.navigate(['/main/successmsg'],{queryParams:{msg:'usersuccess'}});
}

}
