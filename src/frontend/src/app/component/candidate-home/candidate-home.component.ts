import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { DefinedConstants } from '../../app.defined.constants';
import {CommonUtilService} from '../../services/common-util.service';
import {CommonApiService} from '../../services/common-api.service';


@Component({
  selector: 'app-candidate-home',
  templateUrl: './candidate-home.component.html',
  styleUrls: ['./candidate-home.component.css']
})
export class CandidateHomeComponent implements OnInit {

  constructor(public router: Router, public route: ActivatedRoute,public definedConstants: DefinedConstants, public utilService: CommonUtilService, 
  public apiService: CommonApiService) { }

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
    // this.type= type;
    this.utilService.navigateTo(this.definedConstants.USER_HOME,type)
    // console.log("type")
  }

}
