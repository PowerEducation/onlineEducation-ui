import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { UsersInfo } from '../model/users.model';
import { Injectable } from '@angular/core';

@Injectable()
export class CommonUtilService {

  constructor() { }
public mainPageView:boolean;
public browseCoursesView:boolean;
public testSeries:boolean;
public adminPanelView:boolean;
public qManagerView:boolean;
public isUserLoggedIn:boolean = false;
public userInfo:UsersInfo;
public userRole:string;
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
  tokenSeparators:[','],
  placeholder:'Select'
  // containerCssClass:'',
  // dropdownCssClass:''
}

  resetAll(){
    this.mainPageView = false;
    this.browseCoursesView = false;
    this.testSeries = false;
    this.adminPanelView =false;
  }

  setView(type){
    this.resetAll();
    switch(type){
      
    }
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
}