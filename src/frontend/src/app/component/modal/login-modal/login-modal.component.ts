import { ValidateFn } from 'codelyzer/walkerFactory/walkerFn';
import { UserError } from '@angular/tsc-wrapped';
import { Component, OnInit,ViewChild } from '@angular/core';
import {BSModalContext} from "angular2-modal/plugins/bootstrap/modal-context";
import {CloseGuard, ModalComponent, DialogRef} from "angular2-modal/esm/index";
import {FormGroup,FormBuilder,Validators,AbstractControl,FormControl,ReactiveFormsModule,NgForm } from '@angular/forms';
import {CommonApiService} from '../../../services/common-api.service';
import {CommonUtilService} from '../../../services/common-util.service';
import {DefinedConstants} from "../../../app.defined.constants";
import { Users, UsersInfo } from '../../../model/users.model';

export class CustomModalContext extends BSModalContext {
}

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements  CloseGuard, ModalComponent<CustomModalContext>,OnInit {

  @ViewChild('loginForm') loginForm:NgForm;
  public signUpForm:FormGroup;
  private context:CustomModalContext;
  public userName;
  public  pwd;
  public cPwd;
  public viewType:string;
  public loginError="false";
  public hasErrors =false;
  constructor(public dialog: DialogRef<CustomModalContext>,private apiService:CommonApiService,
    public definedConstants:DefinedConstants,private commonService: CommonUtilService) {
    this.context = this.dialog.context;
    this.dialog.setCloseGuard(this);
     this.viewType="signIn";
  }

  ngOnInit() {
  this.viewType="signIn";
  
  }
close(){
    // this.context = this.dialog.context;
    this.dialog.close(false);
  }
  signIn(){
  this.viewType="signIn";
  console.log("loginForm??",this.loginForm);
  let user = new Users()
  user.userID = this.loginForm.value.userName;
  user.password = this.loginForm.value.password;
  this.apiService.genericPost(this.definedConstants.API_BASE_URL +this.definedConstants.API_USER_SIGNIN,user).subscribe(
    response =>{
      // if(response.password === this.loginForm.value.password){
        console.log("Succesful Login..");
        this.commonService.userInfo = new UsersInfo();
         this.commonService.userInfo.userID = response.userId;
         this.commonService.userInfo.FName = response.fName;
         this.commonService.userInfo.LName = response.lName;
         this.commonService.userInfo.role = response.role;
        this.commonService.isUserLoggedIn =true;
        sessionStorage.setItem("userLogin",JSON.stringify(response));
        this.close();
      // }
      // else
      //   this.loginError="Password do not matches."
    },
    error=>{
      this.hasErrors = true;
      this.loginError="User Name do not exists. Sign up first."
      console.log("Error in creating");
    });
  }
  signup(){
    this.signUpForm = new FormGroup({
      'uNm': new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(25)],Validators.apply(this.validateUserName)),     
      'email':new FormControl(null,[Validators.required,Validators.email]),
      'fNm':new FormControl(null,[Validators.required,Validators.minLength(2),Validators.maxLength(32)]),
      'lNm':new FormControl(null,[Validators.required,Validators.minLength(2),Validators.maxLength(32)]),
      'pwd':new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(24)]),
      'cPwd':new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(24)])
    });
    this.viewType = "signUp";
}
save(){
  var user = new Users();
  user.userID = this.signUpForm.value.uNm;
  user.password = this.signUpForm.value.pwd;
  user.email = this.signUpForm.value.email;
  user.firstName = this.signUpForm.value.fNm;
  user.lastName = this.signUpForm.value.lNm;
  user.userTimeStamp = (new Date()).toJSON();
  console.log(user);
  this.apiService.genericPost(this.definedConstants.API_BASE_URL+this.definedConstants.API_USER_SIGNUP,user).subscribe(
    response=>{
     sessionStorage.setItem("userLogin",response);
      this.close();
    },
    error=>{
      console.log("Issue Happened...")
    });
  
}
/**
 * Method To validate the User Name on Blur..
 */
  validateUserName(){
    this.apiService.genericGet(this.definedConstants.API_BASE_URL+this.definedConstants.API_FINDBY_USERID+this.signUpForm.value.uNm).subscribe(
      response=>{
          this.hasErrors =true;
          this.loginError="User Name Exists. Try with different user name.";
          return true;
      },
      error=>{
        this.hasErrors =false;
        return false;
      }
    );
  }

}

