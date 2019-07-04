import { Component, OnInit } from '@angular/core';
import {RmservicesService} from '../../api/rmservices.service'
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-rmgrouporganisation',
  templateUrl: './rmgrouporganisation.component.html',
  styleUrls: ['./rmgrouporganisation.component.css']
})
export class RmgrouporganisationComponent implements OnInit {
  orgList: any = [];
  selectedOrg: any;
  constructor(private rmservice: RmservicesService,
    private router: Router,
    private location: Location) { }

  ngOnInit() {
  }

  private loadAllOrg(){
    this.rmservice.getAllOrganizations().then(resp => {
      this.orgList = resp.data;
      console.log("Organisation data List....")
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
    this.router.navigate(['/rmorggroups', this.selectedOrg.OrgId]);
    // this.router.navigate(['../rmorganisationdetail', ]);
  }


}
