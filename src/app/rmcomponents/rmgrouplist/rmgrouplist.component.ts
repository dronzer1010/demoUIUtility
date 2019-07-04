import { Component, OnInit } from '@angular/core';
import{RmservicesService} from '../../api/rmservices.service'
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-rmgrouplist',
  templateUrl: './rmgrouplist.component.html',
  styleUrls: ['./rmgrouplist.component.css']
})
export class RmgrouplistComponent implements OnInit {
  public id: string;
  // public Authmatrix: string;
  public showgroup: any;
  public hidegroup:any;
  public newcnt: any;
  public cnt: any;
  public groupDetail: any;
  public innerlength: any;
  filterQuery = "";
  rowsOnPage = 10;
  sortBy = "email";
  sortOrder = "asc";
  constructor(private rmservice: RmservicesService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.rmservice.getAllGroups(this.id).then(resp => {
      for (let i = 0; i < resp.data.length; i++) {
        if (resp.data[i].OrgId == this.id) {
          this.showgroup = true;
          this.groupDetail = resp.data[i].data;
        }else{
              this.hidegroup = true;
        }
      }
      console.log("Group details ... " + this.groupDetail);
    });
  }

}
