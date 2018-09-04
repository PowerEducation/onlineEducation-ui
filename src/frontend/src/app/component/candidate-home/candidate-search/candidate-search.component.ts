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

  searchUser(){
     this.apiService.genericGet(this.definedConstants.API_BASE_URL+this.definedConstants.API_FIND_USER_BY_NAME+this.searchString).subscribe(
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

  delete(user,index){
    console.log(user)
    console.log(this.utilService.userInfo)
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this profile!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      console.log("<<<<<<<<<<<<<"+result)
      if (result) {
        //  this.apiService.generic(this.)
        swal(
          'Deleted!',
          'Work in Progress.',
          'success'
        )
      }
    }).catch(swal.noop);
   
  }
}
