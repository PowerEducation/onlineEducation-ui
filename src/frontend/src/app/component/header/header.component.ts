import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {MatDialog} from '@angular/material';
import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { LoginModalComponent } from '../modal/login-modal/login-modal.component';
import {CommonUtilService} from '../../services/common-util.service';
import {DefinedConstants} from "../../app.defined.constants";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // constructor(private modal:Modal, vcRef:ViewContainerRef,private commonService: CommonUtilService,
  //             private router: Router, private route: ActivatedRoute,private defineConstants: DefinedConstants) {
  //   modal.defaultViewContainer = vcRef;
  //  }

  constructor(private utilService: CommonUtilService,public modal: Modal,
  private dialog: MatDialog,private router: Router, private route: ActivatedRoute,
  private defineConstants: DefinedConstants) {
   }

  public typeCourse;
  public courseList;
  public isLogin = false;
  public userLogin:any;
  public userRole;


  ngOnInit() {
    this.utilService.getUserInformation();
    if(this.utilService.isUserLoggedIn){
      this.isLogin = true;
      this.userRole = this.utilService.userInfo.role;
    }else
      this.userRole=this.defineConstants.ROLE_UNKNOWN;
  }

  signMeIn(){
      let dialogRef = this.dialog.open(LoginModalComponent, {
      width: '600px',
      data: 'This Is Dialog Componenet'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result!==undefined){
        let userInfo = result;
        this.userRole = userInfo.userRole;
        if(this.userRole == this.defineConstants.ROLE_ADMIN)
           this.router.navigate(['/admin-home'] );
      
      }
      // this.animal = result;
    });
//        this.modal.alert()
//        .size('lg')
//        .showClose(true)
//        .title('A simple Alert style modal window')
//        .body(`
//            <h4>Alert is a classic (title/body/footer) 1 button modal window that 
//            does not block.</h4>
//            <b>Configuration:</b>
//            <ul>
//                <li>Non blocking (click anywhere outside to dismiss)</li>
//                <li>Size large</li>
//                <li>Dismissed with default keyboard key (ESC)</li>
//                <li>Close wth button click</li>
//                <li>HTML content</li>
//            </ul>`)
//        .open();
    
    //  this.modal.open(LoginModalComponent)
    //   .then(dialogRef => {
    //         dialogRef.result.then( result => alert('The result is: ${result}');
    //     });
      //   dialogRef => {(d) => d.result)
      // .then((r) => {
      //   /*let navigationExtras:NavigationExtras = {
      //    }*/
      //   if (r)
      //     console.log("r>>>"+r);
      // });
    console.log("Signing in>>");
  }
  
  navigateTo(type,subType){
    this.utilService.resetAll();
    if(type=="browseCourses"){
      this.utilService.browseCoursesView =true;
      let navParams : NavigationExtras;
      navParams = {
        queryParams:{
          'page': 'browseCourses'
        }
      }
      this.router.navigate(['/home'],navParams);
  }else if (type=="testSeries"){
     if(subType=="test"){
      this.router.navigate(['/beginTest']);
    }else{
    this.utilService.testSeries =true;
    this.router.navigate(['/home'], { queryParams: { page:'testSeries'  } });
    }
  }else if(type==="QManager"){
    this.utilService.qManagerView =true;
    this.router.navigate(['/home'], { queryParams: { page:'questionManager'  } });
    console.log("Moving to Q Manager");
  }else if(type==="importQuestionView"){
      this.utilService.importQuestionView =true;
      this.router.navigate(['/home'], { queryParams: { page:'importQuestionView'  } });
      console.log("Moving to Q Manager");
  }
  else{
      sessionStorage.setItem('course',type);
      this.utilService.mainPageView =true;
      this.utilService.browseCoursesView =false;
      this.utilService.testSeries = false;
      this.router.navigate(['/home'] );
    }
    
  }

  showMore(type){
    this.typeCourse = type;
    if(type==='ssc')
      this.courseList = this.defineConstants.sscCourseList;
    else if(type==='bfsi')
      this.courseList = this.defineConstants.bfsiCourseList;
    else if(type==='sla')
      this.courseList = this.defineConstants.slaCourseList;
  }

  /**
 * Method to Log out the user
 */
  loggingOut(){
    if(this.utilService.userInfo.role === this.defineConstants.ROLE_ADMIN){
       this.router.navigate(['/home'] );
    }
    this.userRole = this.defineConstants.ROLE_UNKNOWN;
    this.utilService.loggedOutUser();
    
  }
}
