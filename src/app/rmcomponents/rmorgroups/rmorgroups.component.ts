import { Component, OnInit } from '@angular/core';
import {RmservicesService} from '../../api/rmservices.service'
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-rmorgroups',
  templateUrl: './rmorgroups.component.html',
  styleUrls: ['./rmorgroups.component.css']
})
export class RmorgroupsComponent implements OnInit {
  public id: string;
  public groupDetail: any;
  public myObjStr: any;
  filterQuery = "";
  rowsOnPage = 10;
  sortBy = "email";
  sortOrder = "asc";
  public usersData: any;
  constructor(private rmservice: RmservicesService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.rmservice.getAllGroupsById(this.id).then(resp => {
      this.groupDetail = resp.data;
      console.log(this.groupDetail);
    });
  }

}
