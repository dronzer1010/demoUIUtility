import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {RmservicesService} from '../../api/rmservices.service'
@Component({
  selector: 'app-rmrulevalidation',
  templateUrl: './rmrulevalidation.component.html',
  styleUrls: ['./rmrulevalidation.component.css']
})
export class RmrulevalidationComponent implements OnInit {

  public amt;
  public orgAllDetail: any = [];
  public selectedOrg: any;
  public amountLblValue: any;
  rulesData: any = [];
  filterQuery = "";
  rowsOnPage = 10;
  sortBy = "email";
  sortOrder = "asc";
  constructor(private route: ActivatedRoute, private router: Router,private rmservice:RmservicesService) { }

  ngOnInit() {
    this.rmservice.getAllOrganizations().then(resp => {
      this.orgAllDetail = resp.data;
      console.log("Data" + this.orgAllDetail);
    });
  }

  open(amount): any {
    this.amountLblValue = amount;
    this.rmservice.ruleValidate(amount + "", this.selectedOrg.OrgId + "").then(resp => {
      this.rulesData = resp.data;
      console.log("Data" + this.rulesData);
    });
    console.log("Amount" + amount);
  }

  onOrganizationChange(orgName) {
    //orgName.trim()
    //this.selectedOrg=[];
    console.log('orgName : ' + orgName);
    this.selectedOrg = this.getSelectedOrgByName(orgName.trim());
    console.log('selectedOrg : ')
    console.log(this.selectedOrg);
  }

  getSelectedOrgByName(selectedName: string): any {
    return this.orgAllDetail.find(org => org.CompanyName === selectedName);
  }
}
