import { Component, OnInit,trigger,state,style,transition,animate } from '@angular/core';
import {CommonUtilService} from '../../services/common-util.service';
import {CommonApiService} from '../../services/common-api.service';

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

  constructor(private utilService :CommonUtilService) { }

  ngOnInit() {
    console.log(this.utilService.mainPageView);
  }

}
