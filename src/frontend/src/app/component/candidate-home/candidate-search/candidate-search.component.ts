import { Component, OnInit } from '@angular/core';
import { DefinedConstants } from '../../../app.defined.constants';
import {CommonUtilService} from '../../../services/common-util.service';
import {CommonApiService} from '../../../services/common-api.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-candidate-search',
  templateUrl: './candidate-search.component.html',
  styleUrls: ['./candidate-search.component.css']
})
export class CandidateSearchComponent implements OnInit {

  constructor(public definedConstants: DefinedConstants, public utilService: CommonUtilService, 
  public apiService: CommonApiService) { }
 
  ngOnInit() {
  }
 public searchString:string="";
 public allUsers:any=[];
 public userType:string="ALL";

  searchUser(){
    let APIStrig = "";
    if(this.userType=="A")
      APIStrig = this.definedConstants.API_FIND_Active_USER_BY_NAME;
    else if(this.userType=="I")
      APIStrig = this.definedConstants.API_FIND_In_Active_USER_BY_NAME;
    else
      APIStrig = this.definedConstants.API_FIND_ALL_USER_BY_NAME;

     this.apiService.genericGet(this.definedConstants.API_BASE_URL+APIStrig+this.searchString).subscribe(
      response=>{
        this.allUsers = response._embedded.userInfoes;
        // this.tests = response._embedded.tests;
      },error=>{
        console.error("Error in Getting Response")
      });
  }
  viewProfile(type,user,index){
    console.log(user)
    console.log(index)
    this.utilService.userHomeProfile = user;
    this.utilService.navigateTo(this.definedConstants.USER_HOME,type);
  }

/**
 * 
 * @param user 
 * @param index 
 * @param mode : Mode 0 means delete and 1 means enable it
 */
  delete(user,index,mode){
    console.log(user)
    let userTextString:any=[];
    // Deletion message
    if(mode==0){
      userTextString[0]="User won't able to login until you mark him Active again."
      userTextString[1]= "Disable it";
    }
    // Enable message
    else{

      userTextString[0]="User will be able to login and can access his profile now."
      userTextString[1]= "Enable it";
    }

      swal({
      title: 'Are you sure?',
      text: userTextString[0],
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: userTextString[1]
    }).then((result) => {
      if (result) {
        let userUpdated:any = JSON.parse(JSON.stringify(user));
        if(mode==0)
          userUpdated.status= "I";
        else
          userUpdated.status="A";
        delete userUpdated["_links"];
        delete userUpdated["__proto__"];
        // console.log("userUpdated>>>>",userUpdated.json)
        // console.log("userUpdated>>>>",user)
        this.apiService.genericPut(user._links.self.href,userUpdated ).subscribe(
          response=>{
            if(mode==0){
              user.status= "I";
              swal('De-Activate!',"User is Deactivate now. Hw won't be able to access his profile now." ,'success')
            }
            else{
               user.status="A";
              swal('Activate!','Congratulation.. User is able to access his profile now.','success')
              
            }
               
          }
        )

        
      }
    }).catch(swal.noop);
    
   
  }
}
