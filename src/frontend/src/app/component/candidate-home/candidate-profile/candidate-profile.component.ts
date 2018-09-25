import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { DefinedConstants } from '../../../app.defined.constants';
import {CommonApiService} from '../../../services/common-api.service';
import {CommonUtilService} from '../../../services/common-util.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Test } from '../../../model/course.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.css']
})
export class CandidateProfileComponent implements OnInit {

  constructor(public _formBuilder: FormBuilder, public definedConstants: DefinedConstants,public utilService:CommonUtilService,
          public apiService:CommonApiService, public router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.utilService.userHomeProfile)
    this.initializePage();
  }
  ngOnDestroy(){
    this.utilService.userHomeProfile = undefined;
    this.utilService.userHomeProfile = this.utilService.userInfo;
    if(this.utilService.userHomeProfile.userID ==undefined)
      this.utilService.userHomeProfile.userID= this.utilService.userHomeProfile.userId;
  }

  public userHome: FormGroup;
  public userID = new FormControl('',[Validators.required]);
  public fName = new FormControl('',[Validators.required]);
  public lName = new FormControl('',[Validators.required]);
  public mailid  = new FormControl('',[Validators.required]);
  public cellNo = new FormControl('',[Validators.required]);
  public gender = new FormControl('',[Validators.required]);
  public role = new FormControl('',[Validators.required]);
  public addressLine1 = new FormControl('',[Validators.required]);
  public addressLine2 = new FormControl('',[Validators.required]);
  public city = new FormControl('',[Validators.required]);
  public state = new FormControl('',[Validators.required]);
  public country = new FormControl('',[Validators.required]);
  public zip = new FormControl('',[Validators.required]);
  public dob = new FormControl('',[Validators.required]);
  public selectedRole = new FormControl();
  initializePage(){
    this.userHome = this._formBuilder.group({
      userID: this.userID,
      fName: this.fName,
      lName: this.lName,
      mailid: this.mailid,
      cellNo: this.cellNo,
      gender: this.gender,
      addressLine1:this.addressLine1,
      addressLine2:this.addressLine2,
      state:this.state,
      city:this.city,
      role:this.role,
      dob:this.dob,
    });
   
    if(this.utilService.userHomeProfile!=undefined)
      this.updateInformation();
    else{
       this.utilService.userHomeProfile = this.utilService.userInfo;
       this.updateInformation();
    }

    console.log("role is>>",this.role.value)
  }

  validateformField(type){

  }
  
  updateInformation(){
    this.selectedRole.patchValue(this.utilService.userHomeProfile.role);
    console.log(this.selectedRole)
    this.userHome.patchValue({
       userID: this.utilService.userHomeProfile.userID,
       fName:this.utilService.userHomeProfile.fName,
       lName:this.utilService.userHomeProfile.lName,
       mailid: this.utilService.userHomeProfile.mailID,
       cellNo: this.utilService.userHomeProfile.cellNo,
       gender: this.utilService.userHomeProfile.gender,
       addressLine1:this.utilService.userHomeProfile.addressLine1,
       addressLine2:this.utilService.userHomeProfile.addressLine2,
       state:this.utilService.userHomeProfile.state,
       city:this.utilService.userHomeProfile.city,
       role:this.utilService.userHomeProfile.role,
       dob:this.utilService.userHomeProfile.dob,
    });
  }

  addNewUser(){
     this.userHome.patchValue({
       userID: "",
       fName:"",
       lName:"",
       mailid: "",
       cellNo: "",
       gender: "",
       addressLine1:"",
       addressLine2:"",
       state:"",
       city:"",
       role:"",
    });
  }
  saveProgress(type){
    console.log(this.userHome.value.fName)
    console.log(this.userHome.value.lName)
    console.log(this.userHome.value.userID)

  }
  updateRole(){
    console.log(this.selectedRole)
    //  this.userHome.patchValue({
    //   role:this.selectedRole
    // });
  }
}
