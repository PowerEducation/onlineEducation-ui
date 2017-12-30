import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {Modal, BSModalContext} from "angular2-modal/plugins/bootstrap";
import {overlayConfigFactory, Overlay} from "angular2-modal/esm/index";
import { LoginModalComponent } from '../modal/login-modal/login-modal.component';
import {CommonUtilService} from '../../services/common-util.service';
import {DefinedConstants} from "../../app.defined.constants";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private modal:Modal, overlay:Overlay, vcRef:ViewContainerRef,private commonService: CommonUtilService,
              private router: Router, private route: ActivatedRoute,private defineConstants: DefinedConstants) {
    overlay.defaultViewContainer = vcRef; }

  public typeCourse;
  public courseList;
  public isLogin = false;
  public userLogin:any;

  ngOnInit() {
    this.userLogin = JSON.parse(sessionStorage.getItem("userLogin"));
    if(this.commonService.isUserLoggedIn){
      this.isLogin = true;
    }
  }

  signMeIn(){
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
    
     var dialog = this.modal.open(LoginModalComponent, overlayConfigFactory({}, BSModalContext));
    dialog
      .then((d) => d.result)
      .then((r) => {
        /*let navigationExtras:NavigationExtras = {
         }*/
        if (r)
          console.log("r>>>"+r);
      });
    console.log("Signing in>>");
  }
  navigateToCourses(){
    this.commonService.mainPageView =false;
    this.commonService.browseCoursesView =true;
    this.commonService.testSeries = false;
    let navParams : NavigationExtras;
    navParams = {
      queryParams:{
        'page': 'browseCourses'
      }
    }
    this.router.navigate(['/home'],navParams);

  }
  navigateToTestSeries(typeTest){
    if(typeTest=="test"){
      this.router.navigate(['/beginTest']);
    }else{
    this.commonService.mainPageView =false;
    this.commonService.browseCoursesView =false;
    this.commonService.testSeries =true;
    this.router.navigate(['/home'], { queryParams: { page:'testSeries'  } });
    }
    
  }
  navigate(type){
    sessionStorage.setItem('course',type);
    this.commonService.mainPageView =true;
    this.commonService.browseCoursesView =false;
    this.commonService.testSeries = false;
    this.router.navigate(['/home'] );
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
    this.commonService.isUserLoggedIn =false;
    this.commonService.userInfo = null;
  }
}
