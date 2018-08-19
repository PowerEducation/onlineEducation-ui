import { DefinedConstants } from '../../app.defined.constants';
import { ViewState } from '@angular/core/src/view/types';
import { BrowseCoursesViewComponent } from '../browse-courses-view/browse-courses-view.component';
import { ActivatedRoute, Router } from '@angular/router';
import { animate, Component, OnInit, state, style, transition, trigger, ViewChild, ViewChildren } from '@angular/core';
import {CommonUtilService} from '../../services/common-util.service';
import {CommonApiService} from '../../services/common-api.service';
import {Subscription} from 'rxjs/Rx';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations:[
    trigger('moveInOut',[
      state('in',style({
        transform:'translate3d(0,0,0)'
      })),
      state('out',style({
        transform:'translate3d(-250px,0,0)'
      })),
      transition('in => out',animate('400ms ease-in-out')),
      transition('out => in',animate('400ms ease-in-out'))
    ])
  ]
})
export class MainComponent implements OnInit {

  public subscription: Subscription;
  public param:string;

  @ViewChildren('childView') childViews
  self = this;

  @ViewChild(BrowseCoursesViewComponent)
  public browseCoursesViewComponent: BrowseCoursesViewComponent;

  constructor(public utilService :CommonUtilService, public definedConstants: DefinedConstants,
  public router:Router, public route: ActivatedRoute) { }

  ngOnInit() {
    console.log("Trace")
    this.utilService.getUserInformation();
   
    this.subscription = this.route.queryParams.subscribe(
      queryParam =>{ 
        this.param = queryParam['page'];
        this.utilService.viewSwitch(this.param);
        console.log("SEEEE"+this.param);
      }
    )
    if(this.param ==undefined)
      this.utilService.viewSwitch(this.definedConstants.MAIN_PAGE_VIEW);
    else
      this.utilService.viewSwitch(this.param);
     console.log("this.param>>"+this.param)
     console.log("CateGory View"+this.utilService.testProductView)
  }
}
