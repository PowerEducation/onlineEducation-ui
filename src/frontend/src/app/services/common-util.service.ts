import { UsersInfo } from '../model/users.model';
import { Injectable } from '@angular/core';

@Injectable()
export class CommonUtilService {

  constructor() { }
public mainPageView:boolean;
public browseCoursesView:boolean;
public testSeries:boolean;
public isUserLoggedIn:boolean = false;
public userInfo:UsersInfo;

  resetAll(){
    this.mainPageView = false;
    this.browseCoursesView = false;
    this.testSeries = false;
  }

  setView(type){
    this.resetAll();
    switch(type){
      
    }
  }
}