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

  private subscription: Subscription;
  private param:string;

  @ViewChildren('childView') childViews
  self = this;

  @ViewChild(BrowseCoursesViewComponent)
  private browseCoursesViewComponent: BrowseCoursesViewComponent;

  constructor(private utilService :CommonUtilService, private definedConstants: DefinedConstants,
  private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.utilService.getUserInformation();
    this.subscription = this.route.queryParams.subscribe(
      queryParam => this.param = queryParam['page']
    )
    if(this.param ==undefined)
      this.viewSwitch(this.definedConstants.MAIN_PAGE_VIEW);
    else
      this.viewSwitch(this.param);
  }


viewSwitch(type){
  this.resetAll();
  switch(type){
    case this.definedConstants.MAIN_PAGE_VIEW:
        this.utilService.mainPageView = true;
        break;
    case this.definedConstants.COURSE_VIEW:
        this.utilService.browseCoursesView = true;
    case this.definedConstants.TEST_SERIES_VIEW:
        this.utilService.testSeries =true;
    case this.definedConstants.Q_Manager_View:
        this.utilService.qManagerView =true;    
  }
}
  resetAll(){
    this.utilService.mainPageView = false;
    this.utilService.browseCoursesView = false;
    this.utilService.testSeries = false;
    this.utilService.qManagerView =false;
  }
}
