import { Component, OnInit,ViewEncapsulation, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OwlCarousel } from 'ngx-owl-carousel';
import { DatepickerOptions } from 'ng2-datepicker';
import * as frLocale from 'date-fns/locale/fr';
import { Router,ActivatedRoute } from '@angular/router';
import {UserserviceService} from '../../api/userservice.service'
import{CardserviceService} from '../../api/cardservice.service'
import{DashboardService} from '../../api/dashboard.service'
import {AuthService} from '../../api/auth.service';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import { DatePipe } from '@angular/common'
// Importing translations
import am4lang_lt_LT from "@amcharts/amcharts4/lang/lt_LT";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('owlElement') owlElement: OwlCarousel
  carddata:any;
  filterQuery = "";
  rowsOnPage = 5;
  sortBy = "email";
  sortOrder = "asc";
  billdata:any=[];
  paymentdata:any=[];
  penPaydata:any=[];
  apprPaydata:any=[];
  rejPayData:any=[];
  pendingbillers:any=[];
  apprbillers:any=[];
  rejbillers:any=[];
  billerlength:number=0;
  apprbilllength:number=0;
  rejbilllength:number=0
  penpaylength:number=0;
  apprpaylength:number=0;
  rejpaylength:number=0
  checkerpenbilllen:number=0
  checkeraprbilllen:number=0
  checkerrejbilllen:number=0
  checkerpenpaylen:number=0
  checkeraprpaylen:number=0
  checkerrejpaylen:number=0
  todate:Date = new Date();
  fromdate:Date = new Date('2019-07-10 06:40:03');
  fromfilterstring:any;
  tofilterstring:any;
  displayWelcomModal:string='none'
  userdata:any={};
  username:string="Authorised Signatory"
  settings = {
    bigBanner: true,
    timePicker: false,
    format: 'dd-MM-yyyy',
    defaultOpen: false
}
public utilityparams:string;
public params:string;
cardData:any=[];
rolename:any;
lastpayments:any=[];
  public currentCard: any=0;
  approvedcard:any=[]
  approverDetails:any=[];
selectedIndex = -1;
cardsize:any;
spenddata:any=[];
utilexpensedata:any=[];
totalspendamt:any;
dropdownYear = [];
selectedYear = [];
ddSettingsyear = {};
dropdowncat = [];
selectedCat = [];
ddSettingscat = {};
filteryear:any=2019;
filtercategory:any="6f6af57a-5c48-442e-b5b8-8b3559b10cd9";
  constructor(private cards:CardserviceService,private httpService: HttpClient,private router: Router,private activatedRoute: ActivatedRoute,private usrservice:UserserviceService,private dashservice: DashboardService,public datepipe: DatePipe,private auth: AuthService) { }

  ngOnInit() {
    this.getUserDetail()
   // this.rolename=localStorage.getItem('rolename')
    this.params = this.activatedRoute.snapshot.queryParams["msg"];

    if(this.params=='firstloginas'){
   
      this.displayWelcomModal='block'
    
    }

this.loadtotalspends()
this.utilityexpnse()
   // this.loadallcards()
   this.lastpaymentsdetails()
   this.loadApprovedCards()

 this.loadBarChart()
    // this.httpService.get('./assets/cards.json').subscribe(data=>{
    //   this.carddata=data;
    //   console.log(this.carddata)
     
      
    // })
    this.dropdownYear = [
     
      { item_id: 2019, item_text: 'This Year' },
      { item_id: 2018, item_text: '2018' },
      
    ];
    this.ddSettingsyear = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
      enableCheckAll:false
    };


    this.dropdowncat = [
     
   
      { item_id: "6f6af57a-5c48-442e-b5b8-8b3559b10cd9", item_text: 'Electricity' },
      
    ];
    this.ddSettingscat = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
      enableCheckAll:false
    };
  }
  fun() {
    this.owlElement.next([200])
    //duration 200ms
}

// events
public chartClicked(e:any):void {
  console.log(e);
}

public chartHovered(e:any):void {
  console.log(e);
}

closemodal(){
  this.displayWelcomModal='none'; 
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

private loadallcards(){
 


}

private loadchart(){
 
  /* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
let chart = am4core.create("chartdiv", am4charts.PieChart);

// Add data
chart.data = this.spenddata;

// Add and configure Series
let pieSeries = chart.series.push(new am4charts.PieSeries());
pieSeries.dataFields.value = "spends";
pieSeries.dataFields.category = "utility";
pieSeries.innerRadius = am4core.percent(50);
pieSeries.ticks.template.disabled = true;
pieSeries.labels.template.disabled = true;

let rgm = new am4core.RadialGradientModifier();
rgm.brightnesses.push(-0.8, -0.8, -0.5, 0, - 0.5);
pieSeries.slices.template.fillModifier = rgm;
pieSeries.slices.template.strokeModifier = rgm;
pieSeries.slices.template.strokeOpacity = 0.4;
pieSeries.slices.template.strokeWidth = 0;

chart.legend = new am4charts.Legend();
chart.legend.position = "right";
}

private loadPieChart(){
  /* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
let chart = am4core.create("chartdiv", am4charts.PieChart);

// Add and configure Series
let pieSeries = chart.series.push(new am4charts.PieSeries());
pieSeries.dataFields.value = "spends";
pieSeries.dataFields.category = "utility";

// Let's cut a hole in our Pie chart the size of 30% the radius
chart.innerRadius = am4core.percent(30);

// Put a thick white border around each Slice
pieSeries.slices.template.stroke = am4core.color("#fff");
pieSeries.slices.template.strokeWidth = 2;
pieSeries.slices.template.strokeOpacity = 1;
pieSeries.slices.template
  // change the cursor on hover to make it apparent the object can be interacted with
  .cursorOverStyle = [
    {
      "property": "cursor",
      "value": "pointer"
    }
  ];

pieSeries.alignLabels = false;
pieSeries.labels.template.bent = true;
pieSeries.labels.template.radius = 3;
pieSeries.labels.template.padding(0,0,0,0);

pieSeries.ticks.template.disabled = true;

// Create a base filter effect (as if it's not there) for the hover to return to
let shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter);
shadow.opacity = 0;

// Create hover state
let hoverState = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists

// Slightly shift the shadow and make it more prominent on hover
let hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter);
hoverShadow.opacity = 0.7;
hoverShadow.blur = 5;

// Add a legend
chart.legend = new am4charts.Legend();

chart.data =this.spenddata;
}


private loadBarChart(){
  am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
let chart = am4core.create("chartdivcolumn", am4charts.XYChart);
chart.scrollbarX = new am4core.Scrollbar();

// Add data
chart.data = this.utilexpensedata;

// Create axes
let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "month";
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.minGridDistance = 30;
categoryAxis.renderer.labels.template.horizontalCenter = "right";
categoryAxis.renderer.labels.template.verticalCenter = "middle";
categoryAxis.renderer.labels.template.rotation = 270;
categoryAxis.tooltip.disabled = true;
categoryAxis.renderer.minHeight = 110;

let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.renderer.minWidth = 50;

// Create series
let series = chart.series.push(new am4charts.ColumnSeries());
series.sequencedInterpolation = true;
series.dataFields.valueY = "amount";
series.dataFields.categoryX = "month";
series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
series.columns.template.strokeWidth = 0;

series.tooltip.pointerOrientation = "vertical";

series.columns.template.column.cornerRadiusTopLeft = 10;
series.columns.template.column.cornerRadiusTopRight = 10;
series.columns.template.column.fillOpacity = 0.8;

// on hover, make corner radiuses bigger
let hoverState = series.columns.template.column.states.create("hover");
hoverState.properties.cornerRadiusTopLeft = 0;
hoverState.properties.cornerRadiusTopRight = 0;
hoverState.properties.fillOpacity = 1;

series.columns.template.adapter.add("fill", function(fill, target) {
  return chart.colors.getIndex(target.dataItem.index);
});

// Cursor
chart.cursor = new am4charts.XYCursor();
}

private getUserDetail(){
  this.usrservice.getUserDetails().subscribe(res=>{
    //console.log(res)
    this.userdata=res['Data'];
   
    this.rolename=this.userdata['dualrole']
    this.username=this.userdata['firstname']+" "+this.userdata['lastname']
    if(this.rolename=='checker' || this.rolename=='aschecker' || this.rolename=='ccchecker'){
      this.getCheckerpayLength()
      this.getCheckerbillLength()
    }else if(this.rolename=='maker' || this.rolename=='as' || this.rolename=='ccmaker'){
      this.getDefpayLength()
      this.getDefbillLength()
    }
  },error=>{
    console.log(error['status'])
    if(error['status']==401){
      this.auth.expiresession();
    }
  })
    }

    private loadApprovedCards(){

  
      this.dashservice.getAllCards().then(data=>{
        //console.log(data["data"])
       this.cardData=data["data"]
        
        for(let i = 0; i < this.cardData.length; i++){
          if(this.cardData[i].status == "Approved"){
              this.approvedcard.push(this.cardData[i]);
          }
      }

      if(this.cardData.length>0){
        this.cardsize=this.cardData.length
      }else{
        this.cardsize=0
      }
  
    
  
        // if(this.currenCard ==-1){
        //   this.activeElement=this.approvedcard[0]["id"]
        //   this.getCardbyId(this.approvedcard[0]["id"]);
        // }
      },error=>{
        console.log(error)
      })
    }

    private getDefbillLength(){
      this.dashservice.getbilldefaultcount().then(resp=>{
       
        this.billerlength=resp['pending']
        this.apprbilllength=resp['registered']
        this.rejbilllength=resp['rejected']
      },error=>{
        console.log(error)
      })
    }

    private getDefpayLength(){
      this.dashservice.getpaydefaultcount().then(resp=>{
      
        this.penpaylength=resp['pending']
        this.apprpaylength=resp['approved']
        this.rejpaylength=resp['rejected']
      },error=>{
        console.log(error)
      })
    }

    private getCheckerpayLength(){
      this.dashservice.getpaycheckercount().then(resp=>{
        this.penpaylength=resp['pending']
        this.apprpaylength=resp['approved']
        this.rejpaylength=resp['rejected']
      },error=>{
        console.log(error)
      })
    }

    private getCheckerbillLength(){
      this.dashservice.getbillcheckercount().then(resp=>{
        this.billerlength=resp['pending']
        this.apprbilllength=resp['registered']
        this.rejbilllength=resp['rejected']

      },error=>{
        console.log(error)
      })
    }

    gotpaymentview(){
      this.router.navigate(['/main/paymentlist']);
    }

    gotobillview(){
      this.router.navigate(['/main/billerlist']);
    }

    gotopenbillview(){
      if(this.rolename=='checker' || this.rolename=='aschecker' || this.rolename=='ccchecker'){
        this.router.navigate(['/main/pending-biller']);
      }else if(this.rolename=='maker' || this.rolename=='as' || this.rolename=='ccmaker'){
        this.router.navigate(['/main/billerlist']);
      }
      
    }

    gotopenpayview(){
      if(this.rolename=='checker' || this.rolename=='aschecker' || this.rolename=='ccchecker'){
        this.router.navigate(['/main/pending-payments']);
      }else if(this.rolename=='maker' || this.rolename=='as' || this.rolename=='ccmaker'){
        this.router.navigate(['/main/paymentlist']);
      }
      
    }

    private lastpaymentsdetails(){
      this.dashservice.getlast5payments().then(resp=>{
      
        this.apprPaydata=resp['data']
      },error=>{
        console.log(error)
        if(error['status']==401){
          this.auth.expiresession();
        }
      })
    }

    getapproverdetails(id,index){
      this.selectedIndex = index;
      this.dashservice.paylogs(id).then(resp=>{
        console.log(resp)
        this.approverDetails=resp['data']
        console.log(this.approverDetails)
      },error=>{
        console.log(error)
      })
  
    }

    private loadtotalspends(){
      this.fromfilterstring=this.datepipe.transform(this.fromdate, 'yyyy-MM-dd');
      this.tofilterstring=this.datepipe.transform(this.todate, 'yyyy-MM-dd');
      var daterange={
        "from":this.fromfilterstring,
        "to":this.tofilterstring
      }
      this.dashservice.gettotalspends(daterange).then(resp=>{
        
        this.spenddata=resp['data']
        this.totalspendamt=resp['total_amount']
        this.loadPieChart()
       
      },error=>{
        console.log(error['status'])
        if(error['status']==401){
          this.auth.expiresession();
        }
      })
    }


    private utilityexpnse(){
      var params={
        "year":this.filteryear,
        "utility_id":this.filtercategory
      }
      this.dashservice.getUtilityExpense(params).then(resp=>{
      //  console.log(resp)
       this.utilexpensedata=resp['data']
     
       this.loadBarChart()
      },error=>{
        console.log(error)
      })
    }


    getutilityexpnse(){
      var params={
        "year":this.filteryear,
        "utility_id":this.filtercategory
      }
      this.dashservice.getUtilityExpense(params).then(resp=>{
      //  console.log(resp)
       this.utilexpensedata=resp['data']
       console.log(this.utilexpensedata)
       this.loadBarChart()
      },error=>{
        console.log(error)
      })
    }

    gettotalspends(){
      this.spenddata=[];
      this.fromfilterstring=this.datepipe.transform(this.fromdate, 'yyyy-MM-dd');
      this.tofilterstring=this.datepipe.transform(this.todate, 'yyyy-MM-dd');
      var daterange={
        "from":this.fromfilterstring,
        "to":this.tofilterstring
      }
      this.dashservice.gettotalspends(daterange).then(resp=>{
        console.log(resp)
        this.spenddata=resp['data']
        this.totalspendamt=resp['total_amount']
        this.loadPieChart()
        
      },error=>{
        console.log(error['status'])

      })
    }

    onYearSelectDown(year:any){
      console.log(year)
      this.filteryear=year['item_id']
        console.log(this.filteryear)
    }

    oncatSelectDown(cat:any){
      console.log(cat)
      this.filtercategory=cat['item_id']
        console.log(this.filtercategory)
    }


}
