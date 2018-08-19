import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-left',
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.css']
})
export class LeftComponent implements OnInit {
public fontWidth;
public toggleBar:boolean=true;
  constructor() { }

  ngOnInit() {
    
  }
navToggle(actionControl){
    this.toggleBar = !this.toggleBar;
    // if(actionControl=='open')
    //   // this.fontWidth=200;
    //   this.toggleBar ="open";
    // else if(actionControl=='close'){
    //   this.fontWidth=0;
    // }
  }
}
