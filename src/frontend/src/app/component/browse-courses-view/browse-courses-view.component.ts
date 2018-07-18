import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'app-browse-courses-view',
  templateUrl: './browse-courses-view.component.html',
  styleUrls: ['./browse-courses-view.component.css']
})
export class BrowseCoursesViewComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  public type;
  public typeOfDetails;
  private subscription;
  private pageView:string=""; 
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
