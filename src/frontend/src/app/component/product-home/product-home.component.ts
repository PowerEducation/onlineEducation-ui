import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { DefinedConstants } from '../../app.defined.constants';
import {CommonUtilService} from '../../services/common-util.service';
import {CommonApiService} from '../../services/common-api.service';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.css']
})
export class ProductHomeComponent implements OnInit {

  constructor(public router: Router, public route: ActivatedRoute,public definedConstants: DefinedConstants, 
  public utilService: CommonUtilService, public apiService: CommonApiService) { }

 
  public type:string;
  public subscription;
  ngOnInit() {
    this.type='search';
     this.subscription =  this.route.queryParams.subscribe(
      queryParam => {
        this.type=queryParam.view;
        console.log("queryParam",queryParam)
      }
    )
  }


  getDetails(type){
    this.utilService.navigateTo(this.definedConstants.PRODUCT_HOME,type)
  }

}
