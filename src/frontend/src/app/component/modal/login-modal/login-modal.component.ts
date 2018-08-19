import { Constructor } from 'make-error';
import { ValidateFn } from 'codelyzer/walkerFactory/walkerFn';
// import { UserError } from '@angular/tsc-wrapped';
import { Component, OnInit,ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormGroup,FormBuilder,Validators,AbstractControl,FormControl,ReactiveFormsModule,NgForm } from '@angular/forms';
import {CommonApiService} from '../../../services/common-api.service';
import {CommonUtilService} from '../../../services/common-util.service';
import {DefinedConstants} from "../../../app.defined.constants";
import { Users, UsersInfo } from '../../../model/users.model';


@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {

  // @ViewChild('loginForm') loginForm:NgForm;
  public loginForm: FormGroup;
  public signUpForm:FormGroup;
  public userName;
  public password;
  public  pwd;
  public cPwd;
  public viewType:string;
  public loginError:any = [];
  public hasErrors =false;
  // constructor(public dialog: DialogRef<CustomModalContext>,public apiService:CommonApiService,
  //   public definedConstants:DefinedConstants,public commonService: CommonUtilService) {
  //   this.context = this.dialog.context;
  //   // this.dialog.setCloseGuard(this);
  //    this.viewType="signIn";
  // }

  constructor(public dialog: MatDialogRef<LoginModalComponent>, @Inject(MAT_DIALOG_DATA) public data:string,public apiService:CommonApiService,
    public definedConstants:DefinedConstants,public utilService: CommonUtilService,public _formBuilder: FormBuilder) {
    // this.context = this.dialog.context;
    // this.dialog.setCloseGuard(this);
     this.viewType="signIn";
  }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      userName: this.userName,
      password: this.password
    });    
    this.viewType="signIn";
    this.loginError.push({"cPasswordError":""},{"loginError":""},{"signUpError":""},{"hasErrors":false},{"hasPErrors":true});
  }

close(){
    let userRole = this.definedConstants.ROLE_UNKNOWN;
    if(this.utilService.isUserLoggedIn){
      userRole = this.utilService.userInfo.role
    }
    this.dialog.close({
      "userRole" : userRole
    });
  }
  signIn(){
  this.viewType="signIn";
  let user = new Users()
  user.userID = this.loginForm.value.userName;
  user.password = this.loginForm.value.password;
  this.apiService.genericPost(this.definedConstants.API_BASE_URL +this.definedConstants.API_USER_SIGNIN,user).subscribe(
    response =>{
      // if(response.password === this.loginForm.value.password){
        console.log("Succesful Login..");
        this.utilService.setUser(response);
        
        this.close();
      // }
      // else
      //   this.loginError="Password do not matches."
    },
    error=>{
      this.hasErrors = true;
      this.loginError[0].loginError = "Login Failed. User Id or password is not correct.";
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
          this.loginError[0].signUpError = "User Name Exists. Try with different user name.";
          return true;
      },
      error=>{
        this.hasErrors =true;
        this.loginError[0].signUpError = "";
        return false;
      }
    );
  }

  validatePassword(){
    if(this.signUpForm.value.pwd == this.signUpForm.value.cPwd){
      this.hasErrors =true;
      this.loginError[0].cPasswordError = "";
      this.loginError[0].hasPErrors = true;
    }else{
      this.hasErrors =false;
      this.loginError[0].hasPErrors = false;
      this.loginError[0].cPasswordError = "Password don't matches.";
    }
    console.log("password>>"+this.signUpForm.value.pwd)
    console.log("password>>"+this.signUpForm.value.cPwd)
    
    
  }

}

