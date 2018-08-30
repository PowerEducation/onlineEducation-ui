import { Component,NgZone } from '@angular/core';
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import swal from 'sweetalert2';
import {DefinedConstants} from "./app.defined.constants";
import {CommonUtilService} from './services/common-util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  constructor(public definedConstants: DefinedConstants,private _ngZOne:NgZone, private idle: Idle,public utilService :CommonUtilService){
  this._ngZOne.runOutsideAngular(()=>{
      idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
      idle.setIdle(this.idleTimeOut);
      idle.onIdleStart.subscribe(()=>{
        swal({title:'You will be logged out in 30 seconds.',
        text:'Please use the web page or you will be logged out automatically',
        timer:30000,
        type:'warning'}).then(()=>{
          console.log("Move Out")
        });
      })
    })
  
  idle.onIdleEnd.subscribe(()=>{
    console.log("User Moved out of Idle State.")
  })
  idle.onTimeout.subscribe(()=>{
    this.utilService.loggedOutUser();
    
    console.log("User Session timed out");
    // window.location.href=this.definedConstants.homePageURL;
  })
  idle.watch();
}
  public idleTimeOut=900; //in Sec
}
