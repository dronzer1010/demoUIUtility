import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {RmservicesService} from '../../api/rmservices.service'
@Component({
  selector: 'app-rmorganisationdetail',
  templateUrl: './rmorganisationdetail.component.html',
  styleUrls: ['./rmorganisationdetail.component.css']
})
export class RmorganisationdetailComponent implements OnInit {
  public id: string;
  public orgDetail: any;
  public orgAllDetail: any;
  selectedOrg: any;
  authmatrix:string="";
  corporatename:string="";
  public authvalue: any;
  constructor(private rmservice: RmservicesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.rmservice.getOrganizationsDetailById(this.id).then(resp => {
      console.log(resp)
     this.orgDetail = resp.data[0].Org;
      console.log(this.orgDetail);
      if(this.orgDetail!=null || this.orgDetail!=undefined){
        this.authmatrix=this.orgDetail['authmtrix']
        this.corporatename=this.orgDetail['companyname']
      }else{
        
      }
    });
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.rmservice.getAllOrganizations().then(resp => {
      this.orgAllDetail = resp.data;
      console.log(this.orgAllDetail);
    });
  }

  onOrganizationChange(orgName) {
    console.log('orgName : ' + orgName);
    this.selectedOrg = this.getSelectedOrgByName(orgName);
    console.log('selectedOrg : ' + this.selectedOrg);
  }
  getSelectedOrgByName(selectedName: string): any {
    return this.orgAllDetail.find(org => org.CompanyName.trim() === selectedName);
  }
  gotoDetail(): void {
    console.log(this.id)
    this.router.navigate(['/rmcards', this.id]);
  }
  gotoSupllyDetail(): void {
    this.router.navigate(['/rmbills', this.id]);
  }
  gotoGroupsDetail(): void {
    this.router.navigate(['/rmorggroups', this.id]);
  }
  gotoUserDetail(): void {
    this.router.navigate(['/rmuserreports', this.id]);
  }
  GroupAllDetail(id): any {

    // console.log("company..........." + this.selectedOrg.Authmatrix);

    // this.router.navigate(['/rmgrouplist', this.selectedOrg.OrgId, this.selectedOrg.Authmatrix]);
    window.location.replace("rmorganisationdetail/"+id);
    // this.router.navigate(['/rmorganisationdetail', id]);
    //  this.rmOrganisationDetailService.getOrganizationsDetailById(id).then(resp => {
    //    debugger
    //   this.orgDetail = resp.data[0].Org;
    //   console.log("orgAllDetail" + this.orgDetail);
    // });
  }

}
