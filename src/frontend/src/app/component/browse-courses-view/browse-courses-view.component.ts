import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-browse-courses-view',
  templateUrl: './browse-courses-view.component.html',
  styleUrls: ['./browse-courses-view.component.css']
})
export class BrowseCoursesViewComponent implements OnInit {

  constructor() { }

  public type;
  public typeOfDetails;
  ngOnInit() {
    this.initialize();
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
