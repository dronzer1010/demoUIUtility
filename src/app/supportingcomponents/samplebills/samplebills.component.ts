import { Component, OnInit } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-samplebills',
  templateUrl: './samplebills.component.html',
  styleUrls: ['./samplebills.component.css']
})
export class SamplebillsComponent implements OnInit {
  private _albums: any = [];
  charArray:any=[];
  key: string = 'caption'; //set default
  reverse: boolean = false;
  filteredBills:any[];
  filterShow:boolean=true;
  constructor(private _lightbox: Lightbox,private httpService: HttpClient) {

   }

  ngOnInit() {
    //this.loadSamplebills()
    // this.httpService.get('./assets/bills.json').subscribe(
    //   data=>{
    //     this._albums=data;
    //   }
    // )
    this.loadAllSampleBills()
    this.setCharArray();
  }
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  setCharArray(){
    this.charArray.push('A');
    var tempNextChar='A'
    for(var i=0;i<25;i++){
      tempNextChar= this.nextChar(tempNextChar)
      this.charArray.push(tempNextChar)
    }
  


    console.log('Here is char array')
  }

  nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
  }

  filterSupplierByChar(character:string){
    this.filterShow=false;
    this.filteredBills=[];
    this.filteredBills = this._albums.filter(bill =>{

       return (bill['caption'][0].toUpperCase() == character)
     })
    
     console.log("here comes filtered suppliers")
     console.log(this.filteredBills)
  }
  

  open(index: number): void {
    // open lightbox
    this._lightbox.open(this._albums, index);
  }
 
  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

  private loadAllSampleBills(){
    this._albums=[
      {
          "id":1,
          "src":"assets/samplebills/Image (1).jpg",
          "thumb":"assets/samplebills/thumbs/Image (2)_tn.jpg",
          "caption":"Eastern Power Distribution Company of A.P. Ltd.",
          "state":"Andhra Pradesh"
      },
      {
          "id":2,
          "src":"assets/samplebills/Image (2).jpg",
          "thumb":"assets/samplebills/thumbs/Image (2)_tn.jpg",
          "caption":"Southern Power Distribution Company of A.P Ltd (APSPDCL)",
          "state":"Andhra Pradesh"
      },
      {
          "id":3,
          "src":"assets/samplebills/Image (3).jpg",
          "thumb":"assets/samplebills/thumbs/Image (3)_tn.jpg",
          "caption":"Ajmer Vidyut Vitran Nigam Limited (AVVNL)",
          "state":"Rajasthan"
      },
      {
          "id":4,
          "src":"assets/samplebills/Image (4).jpg",
          "thumb":"assets/samplebills/thumbs/Image (4)_tn.jpg",
          "caption":"Bangalore Electricity supply company Ltd.",
          "state":"Karnataka"
      },
      {
          "id":5,
          "src":"assets/samplebills/Image (5).jpg",
          "thumb":"assets/samplebills/thumbs/Image (5)_tn.jpg",
          "caption":"Bharatpur Electricity Services Limited",
          "state":"Rajasthan"
      },
      {
          "id":6,
          "src":"assets/samplebills/Image (6).jpg",
          "thumb":"assets/samplebills/thumbs/Image (6)_tn.jpg",
          "caption":"BSES Rajdhani",
          "state":"New Delhi"
      },
      {
          "id":7,
          "src":"assets/samplebills/Image (7).jpg",
          "thumb":"assets/samplebills/thumbs/Image (7)_tn.jpg",
          "caption":"BSES Yamuna",
          "state":"New Delhi"
      },
      {
          "id":8,
          "src":"assets/samplebills/Image (8).jpg",
          "thumb":"assets/samplebills/thumbs/Image (8)_tn.jpg",
          "caption":"CESU, Odisha",
          "state":"Odisha"
      },
      {
          "id":9,
          "src":"assets/samplebills/Image (9).jpg",
          "thumb":"assets/samplebills/thumbs/Image (9)_tn.jpg",
          "caption":"Gulbarga Electricity Supply Company Limited (GESCOM)",
          "state":"Karnataka"
      },
      {
          "id":10,
          "src":"assets/samplebills/Image (10).jpg",
          "thumb":"assets/samplebills/thumbs/Image (10)_tn.jpg",
          "caption":"Hubli Electricity Supply Company Ltd. (HESCOM)",
          "state":"Karnataka"
      },
      {
          "id":11,
          "src":"assets/samplebills/Image (11).jpg",
          "thumb":"assets/samplebills/thumbs/Image (11)_tn.jpg",
          "caption":"Brihanmumbai Electricity Supply and Transport Undertaking (BEST Undertaking)",
          "state":"Maharashtra"
      },
      {
          "id":12,
          "src":"assets/samplebills/Image (12).jpg",
          "thumb":"assets/samplebills/thumbs/Image (12)_tn.jpg",
          "caption":"Jodhpur Vidyut Vitran Nigam Limited (JDVVNL)",
          "state":"Rajasthan"
      },
      {
          "id":13,
          "src":"assets/samplebills/Image (13).jpg",
          "thumb":"assets/samplebills/thumbs/Image (13)_tn.jpg",
          "caption":"JAMSHEDPUR UTILITIES &SERVICES COMPANY LTD (JUSCO)",
          "state":"Jharkhand"
      },
      {
          "id":14,
          "src":"assets/samplebills/Image (14).jpg",
          "thumb":"assets/samplebills/thumbs/Image (14)_tn.jpg",
          "caption":"Kota Electricity Distribution Limited(KEDL)",
          "state":"Rajasthan"
      },
      {
          "id":15,
          "src":"assets/samplebills/Image (15).jpg",
          "thumb":"assets/samplebills/thumbs/Image (15)_tn.jpg",
          "caption":"Kerala State Electricity Board Ltd (KSEB Ltd)",
          "state":"Kerala"
      },
      {
          "id":16,
          "src":"assets/samplebills/Image (16).jpg",
          "thumb":"assets/samplebills/thumbs/Image (16)_tn.jpg",
          "caption":"Calcutta Electric Supply Corporation (India) Limited",
          "state":"West Bengal"
      },
      {
          "id":17,
          "src":"assets/samplebills/Image (17).jpg",
          "thumb":"assets/samplebills/thumbs/Image (17)_tn.jpg",
          "caption":"Meghalaya Power Dist Corp Ltd",
          "state":"Meghalaya"
      },
      {
          "id":18,
          "src":"assets/samplebills/Image (18).jpg",
          "thumb":"assets/samplebills/thumbs/Image (18)_tn.jpg",
          "caption":"Madhya Pradesh Madhya Kshetra Vidyut Vitran Company Limited (MPCZ)",
          "state":"Madhya Pradesh"
      },
      {
          "id":19,
          "src":"assets/samplebills/Image (19).jpg",
          "thumb":"assets/samplebills/thumbs/Image (19)_tn.jpg",
          "caption":"MP Poorv Kshetra Vidyut Vitaran-Jabalpur",
          "state":"Madhya Pradesh"
      },
      {
          "id":20,
          "src":"assets/samplebills/Image (20).jpg",
          "thumb":"assets/samplebills/thumbs/Image (20)_tn.jpg",
          "caption":"MSEDCL",
          "state":"Maharashtra"
      },
      {
          "id":21,
          "src":"assets/samplebills/Image (21).jpg",
          "thumb":"assets/samplebills/thumbs/Image (21)_tn.jpg",
          "caption":"New Delhi Municipal Council (NDMC) - Electricity",
          "state":"New Delhi"
      },
      {
          "id":22,
          "src":"assets/samplebills/Image (22).jpg",
          "thumb":"assets/samplebills/thumbs/Image (22)_tn.jpg",
          "caption":"NESCO Utility",
          "state":"Odisha"
      },
      {
          "id":23,
          "src":"assets/samplebills/Image (23).jpg",
          "thumb":"assets/samplebills/thumbs/Image (23)_tn.jpg",
          "caption":"North Bihar Power Distribution Co. Ltd (NBPDCL)",
          "state":"Bihar"
      },
      {
          "id":24,
          "src":"assets/samplebills/Image (24).jpg",
          "thumb":"assets/samplebills/thumbs/Image (24)_tn.jpg",
          "caption":"NOIDA POWER COMPANY LTD (NPCL)",
          "state":"Uttar Pradesh"
      },
      {
          "id":25,
          "src":"assets/samplebills/Image (25).jpg",
          "thumb":"assets/samplebills/thumbs/Image (25)_tn.jpg",
          "caption":"Punjab State Power Corporation Limited (PSPCL)",
          "state":"Punjab"
      },
      {
          "id":26,
          "src":"assets/samplebills/Image (26).jpg",
          "thumb":"assets/samplebills/thumbs/Image (26)_tn.jpg",
          "caption":"Reliance Energy - Mumbai",
          "state":"Maharashtra"
      },
      {
          "id":27,
          "src":"assets/samplebills/Image (27).jpg",
          "thumb":"assets/samplebills/thumbs/Image (27)_tn.jpg",
          "caption":"Torrent Power Limited",
          "state":"Maharashtra"
      },
      {
          "id":28,
          "src":"assets/samplebills/Image (28).jpg",
          "thumb":"assets/samplebills/thumbs/Image (28)_tn.jpg",
          "caption":"Madhya Pradesh Paschim Kshetra Vidyut Vitaran Company Ltd. (MPPKVVCL)",
          "state":"Madhya Pradesh"
      },
      {
          "id":29,
          "src":"assets/samplebills/Image (29).jpg",
          "thumb":"assets/samplebills/thumbs/Image (29)_tn.jpg",
          "caption":"SNDL Nagpur",
          "state":"Maharashtra"
      },
      {
          "id":30,
          "src":"assets/samplebills/Image (30).jpg",
          "thumb":"assets/samplebills/thumbs/Image (30)_tn.jpg",
          "caption":"South Bihar Power Distribution",
          "state":"Bihar"
      },
      {
          "id":31,
          "src":"assets/samplebills/Image (31).jpg",
          "thumb":"assets/samplebills/thumbs/Image (31)_tn.jpg",
          "caption":"Southern Electricity Supply Company Of Odisha Limited (SOUTHCO)",
          "state":"Odisha"
      },
      {
          "id":32,
          "src":"assets/samplebills/Image (32).jpg",
          "thumb":"assets/samplebills/thumbs/Image (32)_tn.jpg",
          "caption":"TATA POWER-MUMBAI",
          "state":"Maharashtra"
      },
      {
          "id":33,
          "src":"assets/samplebills/Image (33).jpg",
          "thumb":"assets/samplebills/thumbs/Image (33)_tn.jpg",
          "caption":"Torrent Power Limited",
          "state":"Gujarat"
      },
      {
          "id":34,
          "src":"assets/samplebills/Image (34).jpg",
          "thumb":"assets/samplebills/thumbs/Image (34)_tn.jpg",
          "caption":"Torrent Power Limited",
          "state":"Uttar Pradesh"
      },
      {
          "id":35,
          "src":"assets/samplebills/Image (35).jpg",
          "thumb":"assets/samplebills/thumbs/Image (35)_tn.jpg",
          "caption":"Torrent Power Limited",
          "state":"Gujarat"
      },
      {
          "id":36,
          "src":"assets/samplebills/Image (36).jpg",
          "thumb":"assets/samplebills/thumbs/Image (36)_tn.jpg",
          "caption":"TATA POWER DELHI DISTRIBUTION LIMITED",
          "state":"New Delhi"
      },
      {
          "id":37,
          "src":"assets/samplebills/Image (37).jpg",
          "thumb":"assets/samplebills/thumbs/Image (37)_tn.jpg",
          "caption":"Northern Power Distribution Company Limited: Warrangal (TSNPDCL)",
          "state":"Telangana"
      },
      {
          "id":38,
          "src":"assets/samplebills/Image (38).jpg",
          "thumb":"assets/samplebills/thumbs/Image (38)_tn.jpg",
          "caption":"TSSPDCL",
          "state":"Telangana"
      },
      {
          "id":39,
          "src":"assets/samplebills/Image (39).jpg",
          "thumb":"assets/samplebills/thumbs/Image (39)_tn.jpg",
          "caption":"Uttar Pradesh Power Corporation Ltd. (UPPCL)",
          "state":"Uttar Pradesh"
      },
      {
          "id":40,
          "src":"assets/samplebills/Image (40).jpg",
          "thumb":"assets/samplebills/thumbs/Image (40)_tn.jpg",
          "caption":"Uttrakhand Power Corporation Limited",
          "state":"Uttarakhand"
      },
      {
          "id":41,
          "src":"assets/samplebills/Image (41).jpg",
          "thumb":"assets/samplebills/thumbs/Image (41)_tn.jpg",
          "caption":"West Bengal State Electricity Distribution Company Limited (WBSEDCL)",
          "state":"West Bengal"
      }
  ];
  }

}
