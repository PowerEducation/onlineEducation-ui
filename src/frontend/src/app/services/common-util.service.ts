import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { UsersInfo } from '../model/users.model';
import { Injectable } from '@angular/core';
import { DefinedConstants } from '../app.defined.constants';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Injectable()
export class CommonUtilService {

  constructor(public definedConstants: DefinedConstants,public router: Router) { }
public mainPageView:boolean;
public browseCoursesView:boolean;
public testSeries:boolean;
public adminPanelView:boolean;
public qManagerView:boolean;
public importQuestionView:boolean;
public addQuestionView:boolean;
public manageEntityView:boolean;
public testManagerView:boolean;
public allTestsView:boolean;
public beginTestView:boolean;
public testProductView:boolean;
public isUserLoggedIn:boolean = false;
public userInfo:UsersInfo;
public userRole:string;
public isTestResumed:any=[];
  // Select2 Theme Starts Here
public optionSelectMultipleTag={
  tags:true,
  multiple:true,
  tokenSeparators:[','],
  placeholder:'Select'
  // containerCssClass:'',
  // dropdownCssClass:''
}
public optionSelectSingle={
  multiple:true,
  closeOnSelect:false,
  tokenCSeparators:[','],
  placeholder:'Select'
  // cointainerCssClass:'',
  // dropdownCssClass:''
}

viewSwitch(type){
  this.resetAll();
  switch(type){
    case this.definedConstants.MAIN_PAGE_VIEW:
        this.mainPageView = true;
        break;
    case this.definedConstants.COURSE_VIEW:
        this.browseCoursesView = true;
        break;
    case this.definedConstants.TEST_SERIES_VIEW:
        this.testSeries =true;
        break;
    case this.definedConstants.Q_Manager_View:
        this.qManagerView =true; 
        break;
    case this.definedConstants.ADD_QUESTIONS_VIEW:
        this.addQuestionView =true; 
        break;
    case this.definedConstants.Q_IMPORT_VIEW:
         this.importQuestionView =true;
         break;
    case this.definedConstants.Q_ENTITY_VIEW:
          this.manageEntityView = true;
          break;
    case this.definedConstants.TEST_MANAGER_VIEW:
         this.testManagerView = true;
         break;
    case this.definedConstants.TEST_CATEGORY_VIEW:
         this.testProductView = true;
         break;
    case this.definedConstants.ALL_TEST_VIEW:
          this.allTestsView = true;
          break;
    case this.definedConstants.TEST_PREVIEW:
          this.beginTestView = true;
          break;
  }
}
  resetAll(){
    this.mainPageView = false;
    this.browseCoursesView = false;
    this.testSeries = false;
    this.qManagerView =false;
    this.addQuestionView=false;
    this.importQuestionView=false;
    this.manageEntityView=false;
    this.testManagerView=false;
    this.testProductView =false;
    this.allTestsView=false;
    this.beginTestView=false;
  }

  setUser(response){
    this.userInfo = new UsersInfo();
    this.userInfo.userID = response.userId;
    this.userInfo.fName = response.fName;
    this.userInfo.lName = response.lName;
    this.userInfo.role = response.role;
    this.isUserLoggedIn =true;
    sessionStorage.setItem("userInfo",JSON.stringify(response));
  }

  getUserInformation(){
    this.userInfo = undefined;
    this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    if (this.userInfo !==undefined && this.userInfo !== null){
      this.isUserLoggedIn =true;
    }else{
      this.isUserLoggedIn =false;
    }
  }
  loggedOutUser(){
    sessionStorage.removeItem("userInfo");
    this.userInfo = undefined;
    this.isUserLoggedIn = false;
  }

  findUniqueFromList(formattedData,itemToSearch){
     const constCurrent = formattedData.map(data => data.itemToSearch);
    return(constCurrent.filter((x, i, a) => x && a.indexOf(x) === i));
  }

  parseAutoId(parsingString){
    return parsingString.split("/")[4];
  }

  encodeLOB(str) {
   return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
     return String.fromCharCode(parseInt('0x' + p1, 16));
   }));
 }

 decodeLOB(str) {
   return decodeURIComponent(atob(str).split('').map(function (c) {
     return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
   }).join(''));
 }

/**
 * This will route your application to correct page. 
 * @param type 
 * @param subType 
 */
 navigateTo(type:string, subType:string){
    this.resetAll();
    if(type=="browseCourses"){
      this.browseCoursesView =true;
      let navParams : NavigationExtras;
      navParams = {
        queryParams:{
          'page': 'browseCourses',
          'view':  subType
        }
      }
      this.router.navigate(['/home'],navParams);
  }
 }
}