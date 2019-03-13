import { Component, OnInit } from '@angular/core';
import{LoaderService} from '../api/loader.service'
@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {
  showLoader: boolean;
  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderService.status.subscribe((val: boolean) => {
      this.showLoader = val;
      //console.log(this.showLoader)
  });
  }

}
