import { Component, OnInit } from '@angular/core';
import {BSModalContext} from "angular2-modal/plugins/bootstrap/modal-context";
import {CloseGuard, ModalComponent, DialogRef} from "angular2-modal/esm/index";
import {FormGroup,FormBuilder,Validators,AbstractControl,ReactiveFormsModule } from '@angular/forms';
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

  private loginForm:FormGroup;
  private context:CustomModalContext;
  public userName;
  public  password;
  public confirm
  public viewType:string;
  constructor(public dialog: DialogRef<CustomModalContext>,fb:FormBuilder,private apiService:CommonApiService,
    public definedConstants:DefinedConstants,) {
    this.context = this.dialog.context;
    this.dialog.setCloseGuard(this);
     this.viewType="signIn";
//    this.loginForm = fb.group({
//      'userName' : ['userName', Validators.required]
//    });
  }

  ngOnInit() {
  this.viewType="signIn";
  }
close(){
    this.context = this.dialog.context;
    this.dialog.close(false);
  }
  signIn(){
  this.viewType="signIn";
  
  this.apiService.genericGet(this.definedConstants.API_BASE_URL +this.definedConstants.API_PROFILE).subscribe(
    response =>{
      console.log(JSON.stringify(response));
    },
    error=>{
      console.log("Error in creating");
    });
  }
  signup(){
  this.viewType = "signUp";
}
save(){
  var user = new Users();
  user.userID = this.userName;
  user.password = this.password;
  this.apiService.genericPost(this.definedConstants.API_BASE_URL+this.definedConstants.API_USER_LOGIN,user).subscribe(
    response=>{
      console.log("User Name is:",JSON.stringify(response));
    },
    error=>{
      console.log("Issue Happened...")
    })
    this.context = this.dialog.context;
    this.dialog.close(false);
}

}

