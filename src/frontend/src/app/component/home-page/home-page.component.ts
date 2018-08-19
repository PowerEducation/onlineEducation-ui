import { Component, OnInit } from '@angular/core';
import { trigger, state, animate, transition, style } from '@angular/animations';
import {CommonUtilService} from '../../services/common-util.service';
import {CommonApiService} from '../../services/common-api.service';
import {DefinedConstants} from "../../app.defined.constants";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
  // animations: [
  //   trigger('myAwesomeAnimation', [
  //       state('small', style({
  //           transform: 'scale(1)',
  //       })),
  //       state('large', style({
  //           transform: 'scale(1.2)',
  //       })),
  //        animate('.3s', style({ opacity: 1 })),
  //       transition('small => large', animate('100ms ease-in')),
  //   ]),
  // ]
})
export class HomePageComponent implements OnInit {


  constructor(public definedConstants: DefinedConstants, public utilService: CommonUtilService, 
  public apiService: CommonApiService) { }
  state ='small';
  ngOnInit() {
  }

  animateMe() {
        this.state = (this.state === 'small' ? 'large' : 'small');
  }
 
}
