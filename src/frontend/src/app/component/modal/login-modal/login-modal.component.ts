import { Component, OnInit,ViewChild } from '@angular/core';
import {BSModalContext} from "angular2-modal/plugins/bootstrap/modal-context";
import {CloseGuard, ModalComponent, DialogRef} from "angular2-modal/esm/index";
import {FormGroup,FormBuilder,Validators,AbstractControl,FormControl,ReactiveFormsModule,NgForm } from '@angular/forms';
import {CommonApiService} from '../../../services/common-api.service';
import {DefinedConstants} from "../../../app.defined.constants";
import {Users} from "../../../model/users.model";

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
  constructor(public dialog: DialogRef<CustomModalContext>,private apiService:CommonApiService,
    public definedConstants:DefinedConstants,) {
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
  this.apiService.genericGet(this.definedConstants.API_BASE_URL +this.definedConstants.API_FINDBY_USERID+this.loginForm.value.userName).subscribe(
    response =>{
      if(response.password === this.loginForm.value.password){
        console.log("Succesful Login..");
        this.loginError="false";
      }
      else
        this.loginError="Password do not matches."
    },
    error=>{
      this.loginError="User Name do not exists. Sign up first."
      console.log("Error in creating");
    });
  }
  signup(){
    this.signUpForm = new FormGroup({
      'uNm': new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(25)]),     
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
  console.log(user);
  this.apiService.genericPost(this.definedConstants.API_BASE_URL+this.definedConstants.API_USER_LOGIN,user).subscribe(
    response=>{
      console.log("User Name is:",JSON.stringify(response));
      this.close();
    },
    error=>{
      console.log("Issue Happened...")
    })
  
}
validateUserName(){
  
}

}

