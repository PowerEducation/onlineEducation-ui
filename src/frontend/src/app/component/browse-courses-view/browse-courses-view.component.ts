import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgClass } from '@angular/common';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'app-browse-courses-view',
  templateUrl: './browse-courses-view.component.html',
  styleUrls: ['./browse-courses-view.component.css']
})
export class BrowseCoursesViewComponent implements OnInit {

  constructor(public router: Router, public route: ActivatedRoute) { }

  public type;
  public typeOfDetails;
  public subscription;
  public pageView:string=""; 
  // @Input() questionType:string;
  // @Input() isResetTriggered:boolean;
  // @Input() quesionData:any;
  // @Output() qData = new EventEmitter();
  ngOnInit() {
    this.initialize();
    this.subscription =  this.route.queryParams.subscribe(
      queryParam => {
        this.pageView=queryParam.view;
        console.log("queryParam",queryParam)
      }
    )
  }
  initialize(){
    this.type = 'examInfo';
    this.typeOfDetails = "examInfo";
  }

  getDetails(typeOfDetails){
    console.log("Details"+typeOfDetails);
    this.typeOfDetails = typeOfDetails;
    this.type = typeOfDetails;

  }
}
