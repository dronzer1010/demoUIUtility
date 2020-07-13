import { Component, OnInit , ViewChild,Input} from '@angular/core';
import {RmservicesService} from '../../api/rmservices.service'
import { OwlCarousel } from 'ngx-owl-carousel';
@Component({
  selector: 'app-rmcardslider',
  templateUrl: './rmcardslider.component.html',
  styleUrls: ['./rmcardslider.component.css']
})
export class RmcardsliderComponent implements OnInit {
  @Input() data: any;
    public toDaySpentDetail: any;
    public orgAllDetail: any;
    public selectedOrg: any;
    public orgId: any;
    public carddataLength:any;
    @ViewChild('owlElement') owlElement: OwlCarousel
    public cardData: any;
    public showIndex: any = 0;
    public cardAllData: any;
    public pages = [
      {image: "../../../assets/img/new-cred-card.png"},
      {image: "../../../assets/img/new-cred-card.png"}
  ];
  public pageNumber : number = 0;
    public pageCount : number = 0;
    public currentCard: any=0;
    approvedcard:any=[];
    cards:any=[];
    selectedRuleValue:any;
  constructor(private rmservice: RmservicesService) { }

  ngOnInit() {
   // this.loadcardSlider()
    this.loadAllOrg()
    //this.loadcards();
  }
  // private loadcardSlider(){
  //   this.rmservice.CardSliderDetails().then(resp => {
  //     this.cardData = resp.data[0].Cards;
  //     if(this.cardData!=null || this.cardData!=null){
  //       this.carddataLength=this.cardData.length
  //     }else{
  //       this.carddataLength=0
  //     }
  //   }); 
  // }

  private loadAllOrg(){
    this.rmservice.getAllOrganizations().then(resp => {
      this.orgAllDetail = resp.data;
      console.log(resp.data)
      this.loadcards();
    });
  }

  onOrganizationChange(orgName) {
    console.log('orgName : ' + orgName);
    this.selectedOrg = this.getSelectedOrgByName(orgName);
    this.orgId = this.selectedOrg.OrgId 
    console.log('selectedOrg : ' + this.selectedOrg);
    this.rmservice.CardSliderDetails().then(resp => {
        this.cardAllData = resp.data;
        if(!!this.cardAllData){
            this.cardData = [];
          for(var i=0; i <this.cardAllData.length; i++){
              if(this.cardAllData[i].OrgId == this.orgId){
                  this.cardData = this.cardAllData[i].Cards;
              }
          } 
        }
      });
  }

  getSelectedOrgByName(selectedName: string): any {
    return this.orgAllDetail.find(org => org.CompanyName === selectedName);
  }

  fun() {
    this.owlElement.next([200])
    //duration 200ms
}

goToNextCard() {
  if (this.approvedcard.length - 1 == this.currentCard) {
    this.currentCard = 0;
  }
  else {
    this.currentCard++;
  }

}

goToPrevCard() {
  if (this.currentCard == 0) {
    this.currentCard = this.approvedcard.length - 1;
  }
  else {
    this.currentCard--;
  }
}

private loadcards(){
  this.rmservice.CardSliderDetails().then(resp => {
    this.cards = resp.data;
    console.log(this.cards)
    for(let i = 0; i < this.cards.length; i++){
        if(this.cards[i].status == "Approved"){
            this.approvedcard.push(this.cards[i]);
        }
    }
   
    
});
}

}
