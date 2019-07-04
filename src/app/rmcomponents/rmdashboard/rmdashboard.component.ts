import { Component, OnInit } from '@angular/core';
import {RmservicesService} from '../../api/rmservices.service'
import { Router } from '@angular/router';
import {AuthService} from '../../api/auth.service'
@Component({
  selector: 'app-rmdashboard',
  templateUrl: './rmdashboard.component.html',
  styleUrls: ['./rmdashboard.component.css']
})
export class RmdashboardComponent implements OnInit {
  public dashboardData: any;
  public topPaymentDetail: any;
  public cardSliderDetail: any;
  public validateToken: any;
  public toDaySpentDetail: any;
  public orgAllDetail: any;
  public selectedOrg: any;
  public orgId: any;
  public orgTotal: any;
  public orgBatch1: any;
  public orgBatch2: any;
  public orgBatch3: any;
  public unit: any;
  public temp: any;
  public cardData: any;
  constructor(private authservice: AuthService,private rmservice:RmservicesService,private router:Router) { }

  ngOnInit() {
    this.loadUserDetails();
    this.loadAllOrganisation();
  }

  private loadAllOrganisation(){
    this.rmservice.getAllOrganizations().then(resp => {
      this.orgAllDetail = resp.data;
    });
  }

  private loadUserDetails(){
    this.rmservice.getUserDetails().then(res => {
      this.dashboardData = res.Data;
      console.log("User Data..." + this.dashboardData);
    });

  }

  onOrganizationChange(orgName) {
    console.log('orgName : ' + orgName);
    this.selectedOrg = this.getSelectedOrgByName(orgName);
    this.orgId = this.selectedOrg.OrgId
    console.log('selectedOrg : ' + this.selectedOrg);
    
    this.rmservice.getAllToDaySpent().then(resp => {
      this.toDaySpentDetail = resp.data;
      console.log(this.toDaySpentDetail);

      for (var i = 0; i < this.toDaySpentDetail.length; i++) {
        if (this.orgAllDetail[i].OrgId == this.orgId) {
          this.orgTotal = this.toDaySpentDetail[i].batch_data.Total;
          this.orgBatch1 = this.toDaySpentDetail[i].batch_data.Batch1;
          this.orgBatch2 = this.toDaySpentDetail[i].batch_data.Batch2;
          this.orgBatch3 = this.toDaySpentDetail[i].batch_data.Batch3;
          console.log("Organisation" + this.orgTotal);
        }
      }
    });
  }

  getSelectedOrgByName(selectedName: string): any {
    return this.orgAllDetail.find(org => org.CompanyName.trim() === selectedName);
  }


}
