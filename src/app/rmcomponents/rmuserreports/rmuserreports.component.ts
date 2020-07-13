import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RmservicesService } from '../../api/rmservices.service'
import { ExcelService } from '../../excelservice/excel.service';
@Component({
  selector: 'app-rmuserreports',
  templateUrl: './rmuserreports.component.html',
  styleUrls: ['./rmuserreports.component.css']
})
export class RmuserreportsComponent implements OnInit {
  public id: string;
  usersList: any = [];
  filterQuery = "";
  filter:any;
  rowsOnPage = 5;
  sortBy = "email";
  sortOrder = "asc";
  public temp: any;
  public checkedValueArray: any = [];
  public showHide: any;
  public test: any;
  public flag: any;
  public comment: any;
  public cntChk:any;
  reverse: boolean = true;
  key: string = 'status';
  isViewuser:boolean;
  isUniuser:boolean;
  isBulkuser:boolean;
  isAppruser:boolean;
  isViewcard:boolean;
  isUnicard:boolean;
  isApprcard:boolean;
  isViewgroup:boolean;
  isUnigroup:boolean;
  isApprgroup:boolean;
  isRuleValidate:boolean;
  isUnirule:boolean;
  isRuleappr:boolean;
  isViewsup:boolean;
  isUnisup:boolean;
  isBulksup:boolean;
  isApprsup:boolean;
  isViewpay:boolean;
  isUnipay:boolean;
  isApprpay:boolean;
  isBulkpay:boolean;
  constructor(private rmservice: RmservicesService,
    private route: ActivatedRoute,private excelService:ExcelService) { }

  ngOnInit() {
    this.temp = false;
    this.showHide = false;
    this.flag = 0;
    this.cntChk = 0;
    this.id = this.route.snapshot.paramMap.get('id');
    this.rmservice.getAllUsers(this.id).then(resp => {
      // this.usersList = resp.data[0].details;
      for(var i=0;i<resp.data.length;i++){
        this.usersList = resp.data[i].details;
      }
      console.log("Data" + this.usersList);
    });
  }

  sortByDesc(sortByValue: string) : void {
    this.sortBy = sortByValue;
    this.sortOrder = "desc";
  }

  sortByAsc(sortByValue: string) : void {
    this.sortBy = sortByValue;
    this.sortOrder = "asc";
  }
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.usersList, 'User Report');
    console.log("Data");
    console.log(this.usersList);
    }

    checkValInArray(tabid:string , tab_array:string[]){
      return (tab_array.indexOf(tabid)==-1)?false:true;
    }

    setPriv(str :string){
      console.log("user permission is "+str);
      str = str.replace("pid=" ,"");
      str = str.replace(";cid=",",");
      str = str.replace(";","");
      str = str.replace(" ","");
      var tab_arr = str.split(",");
    
      this.isViewuser = this.checkValInArray("17",tab_arr)
      //console.log(tab_arr);
      this.isUniuser = this.checkValInArray("6",tab_arr)
      this.isBulkuser = this.checkValInArray("7",tab_arr)
      this.isAppruser = this.checkValInArray("76",tab_arr)
      this.isViewcard = this.checkValInArray("23",tab_arr)
      this.isUnicard = this.checkValInArray("24",tab_arr)
      //console.log(this.isUnicard);
      this.isApprcard = this.checkValInArray("77",tab_arr)
      this.isViewgroup = this.checkValInArray("54",tab_arr)
      this.isUnigroup = this.checkValInArray("53",tab_arr)
      this.isApprgroup = this.checkValInArray("80",tab_arr)
      this.isRuleValidate = this.checkValInArray("39",tab_arr)
      this.isUnirule = this.checkValInArray("40",tab_arr)
      this.isRuleappr = this.checkValInArray("79",tab_arr)
      this.isViewsup = this.checkValInArray("28",tab_arr)
      this.isUnisup = this.checkValInArray("27",tab_arr)
      this.isBulksup = this.checkValInArray("51",tab_arr)
      this.isApprsup = this.checkValInArray("74",tab_arr)
      this.isViewpay = this.checkValInArray("19",tab_arr)
      this.isUnipay = this.checkValInArray("20",tab_arr)
      this.isApprpay = this.checkValInArray("75",tab_arr)
      this.isBulkpay = this.checkValInArray("21",tab_arr)
    }

}
