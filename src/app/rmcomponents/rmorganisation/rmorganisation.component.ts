import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {RmservicesService} from '../../api/rmservices.service'
@Component({
  selector: 'app-rmorganisation',
  templateUrl: './rmorganisation.component.html',
  styleUrls: ['./rmorganisation.component.css']
})
export class RmorganisationComponent implements OnInit {
  orgList: any = [];
  selectedOrg: any;
  selectedOrgValue:any;
  constructor(private rmservice:RmservicesService,private router: Router,
    private location: Location) { }

  ngOnInit() {
    this.rmservice.getAllOrganizations().then(resp => {
      this.orgList = resp.data;
      console.log(this.orgList);
    });
  }

  onOrganizationChange(orgName) {
    console.log('orgName : ' + orgName);
    this.selectedOrg = this.getSelectedOrgByName(orgName);
    console.log('selectedOrg : ');
    console.log(this.selectedOrg)
  }

  getSelectedOrgByName(selectedName: string): any {
    return this.orgList.find(org => org.CompanyName.trim() === selectedName);
}

  gotoDetail(): void {
    this.router.navigate(['../rmorganisationdetail', this.selectedOrg.OrgId]);
  }


}
