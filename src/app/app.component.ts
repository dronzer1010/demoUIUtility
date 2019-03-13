import { Component } from '@angular/core';
import{LoaderService} from './api/loader.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'aquautility';
  showLoader: boolean;

  constructor(private loaderService: LoaderService){

  }
  ngOnInit() {
    this.loaderService.status.subscribe((val: boolean) => {
        this.showLoader = val;
        //console.log(this.showLoader)
    });
    
    //console.log("Token:"+localStorage.getItem('token'));
  }
}
