import { UsersInfo } from '../model/users.model';
import { Injectable } from '@angular/core';

@Injectable()
export class CommonUtilService {

  constructor() { }
public mainPageView = true;
public browseCoursesView =false;
public testSeries = false;
public isUserLoggedIn:boolean = false;
public userInfo:UsersInfo;
}
