import { Component, OnInit } from '@angular/core';
import { trigger, state, animate, transition, style } from '@angular/animations';

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


  constructor() { }
  state ='small';
  ngOnInit() {
  }

  animateMe() {
        this.state = (this.state === 'small' ? 'large' : 'small');
  }
 
}
