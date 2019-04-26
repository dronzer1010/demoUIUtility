import { Component, OnInit } from '@angular/core';
// import * as $ from 'jquery';
// declare var jquery:any;
// declare var $ :any;
// import{GroupService} from '../../api/group.service'
// import { Groups } from '../../models/groups';
import{LoaderService} from '../../api/loader.service';
import { ExcelService } from '../../excelservice/excel.service';
import { GroupserviceService } from '../../api/groupservice.service'
@Component({
  selector: 'app-groupview',
  templateUrl: './groupview.component.html',
  styleUrls: ['./groupview.component.css']
})
export class GroupviewComponent implements OnInit {
  groupData: any = {};
  groups:any=[];
  constructor(private loaderService: LoaderService, private excelService: ExcelService, private groupservice : GroupserviceService) { }

  ngOnInit() {
    this.loadAllGroups();
  }

  private loadAllGroups() {
    this.loaderService.display(true);
    this.groupservice.getAll().subscribe(groups => {
      //console.log(groups);
      this.loaderService.display(false);
       this.groups = groups['data']; 
       //console.log(this.groups);
      },error=>{
        console.log(error)
      });
    // this.groups = [{"lwrlimit":0.0,"grpname":"A","id":97,"uprlimit":1.0E8,"users":["Mr. Thirumurugan J","Ms. Nalini L"],"status":"Approved"},{"lwrlimit":0.0,"grpname":"B","id":98,"uprlimit":1.0E8,"users":["Ms. Meena A","Mr. Ravi Kumar"],"status":"Approved"},{"lwrlimit":0.0,"grpname":"C","id":99,"uprlimit":1.0E8,"users":[],"status":"Approved"},{"lwrlimit":0.0,"grpname":"D","id":100,"uprlimit":0.0,"users":[],"status":"Approved"},{"lwrlimit":0.0,"grpname":"E","id":101,"uprlimit":0.0,"users":[],"status":"Approved"}]
    // this.loaderService.display(false);
} 

exportAsXLSX():void {
  this.excelService.exportAsExcelFile( this.groups, 'Group');
}

}
