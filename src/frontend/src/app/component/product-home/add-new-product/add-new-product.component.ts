import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { DefinedConstants } from '../../../app.defined.constants';
import {CommonApiService} from '../../../services/common-api.service';
import {CommonUtilService} from '../../../services/common-util.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Test } from '../../../model/course.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {

  createNewProduct: FormGroup;
  secondFormGroup: FormGroup;
  addQuestion: FormGroup;
  // public categories:any=[];
  public productName = new FormControl('',[Validators.required]);
  public productCategory = new FormControl('',[Validators.required]);
  public diffLevel = new FormControl('',[Validators.required]);
  public duration  = new FormControl('',[Validators.required]);
  public totQ = new FormControl('',[Validators.required]);
  public totM = new FormControl('',[Validators.required]);
  public percentNegative = new FormControl('',[Validators.required]);
  public isTestNameExists:boolean = false;
  public isTestResumed:boolean=false;
  public questionIdsCount:number;
  public testUpdated:Test;
  public testLink:string;
  public userNameError:string;

  constructor(public _formBuilder: FormBuilder, public definedConstants: DefinedConstants,public utilService:CommonUtilService,
          public apiService:CommonApiService, public router: Router, public route: ActivatedRoute) { }

  ngOnDestroy(){
   this.utilService.isTestResumed = [];
  }
  ngOnInit() {
    this.createNewProduct = this._formBuilder.group({
      productName: this.productName,
      productCategory: this.productCategory,
      diffLevel: this.diffLevel,
      duration: this.duration,
      totQ: this.totQ,
      totM: this.totM,
      percentNegative:this.percentNegative,
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.addQuestion = this._formBuilder.group({
     
    });
     if(this.utilService.isTestResumed.length==2 && this.utilService.isTestResumed[0].testResumed){
       this.createNewProduct.patchValue({ testName:this.utilService.isTestResumed[1].testName,
       testCategory:this.utilService.isTestResumed[1].category,
       diffLevel:this.utilService.isTestResumed[1].diificultyLevel,
       duration : this.utilService.isTestResumed[1].duration,
       totQ:this.utilService.isTestResumed[1].qCount,
       totM:this.utilService.isTestResumed[1].totalMarks,
       percentNegative:this.utilService.isTestResumed[1].percentNegative,
    });
    this.isTestResumed=true;
    this.questionIdsCount = this.utilService.isTestResumed[1].questionIds.length;
    this.testUpdated = this.utilService.isTestResumed[1];
    this.testLink = this.testUpdated._links.self.href;
  }
}

saveNextProgress(){
//  if(this.isTestResumed){
//   swal({
//   title: 'Are you sure?',
//   text: "You won't be able to revert this!",
//   type: 'warning',
//   showCancelButton: true,
//   confirmButtonText: 'Yes, delete it!',
//   cancelButtonText: 'No, cancel!',
//   reverseButtons: true
// }).then((result) => {
//   console.log("result is >>",result)
//   if (result.value) {
//     swal(
//       'Deleted!',
//       'Your file has been deleted.',
//       'success'
//     )
//   } else {
//     swal(
//       'Cancelled',
//       'Your imaginary file is safe :)',
//       'error'
//     )
//   }
//  })}
//  else{

//   }
}
/**
 * Sav the Progress of current Question.
 */
saveProgress(){

  if(this.isTestNameExists){
    swal('','Test name exists. Please use another name.','error');
  }else if(this.createNewProduct.valid){
    let questionId:any=[];
    let test =  new Test();
    test.category = this.createNewProduct.value.testCategory;
    test.testName = this.createNewProduct.value.testName;
    test.diificultyLevel  = this.createNewProduct.value.diffLevel;
    test.duration  = this.createNewProduct.value.duration;
    test.totalMarks  = this.createNewProduct.value.totM;
    test.qCount  = this.createNewProduct.value.totQ;
    test.percentNegative = this.createNewProduct.value.percentNegative;
    test.questionIds = this.utilService.encodeLOB(JSON.stringify(questionId));
    test.status=this.definedConstants.STATUS_PENDING;
    this.apiService.genericPost(this.definedConstants.API_BASE_URL+this.definedConstants.API_TEST,test).subscribe( 
      response=>{
          this.isTestNameExists = true;
          swal("","Saved the Test",'success');
          this.isTestResumed =true;
          this.testUpdated = response;
      },error=>{
        console.error("","Error in Saving the Test Progress","error")
      }
    )
  }else{
    swal('','Missing out something in the form. Resolve them first.','error');
  }
}

/**
 * It Updates the existing test Update.
 */
updateProgress(){
  if(this.createNewProduct.value.totQ < this.testUpdated.questionIds.length){
     swal("","Question count can't be less than total added questions.",'error');
  }
  else{
    let tempTest= new Test(); 
    tempTest.category = this.createNewProduct.value.testCategory;
    tempTest.testName = this.createNewProduct.value.testName;
    tempTest.diificultyLevel  = this.createNewProduct.value.diffLevel;
    tempTest.duration  = this.createNewProduct.value.duration;
    tempTest.totalMarks  = this.createNewProduct.value.totM;
    tempTest.qCount  = this.createNewProduct.value.totQ;
    tempTest.percentNegative  = this.createNewProduct.value.percentNegative;
    tempTest.questionIds = this.utilService.encodeLOB(JSON.stringify(this.testUpdated.questionIds));
    tempTest.status = this.testUpdated.status;
    this.apiService.genericPut(this.testLink, tempTest).subscribe( 
      response=>{
        swal("","Updated the Test",'success');
        this.testUpdated = response;
      },error=>{
        console.error("","Error in Saving the Test Progress","error")
    })
  }
}

/**
 * This Method validate the test name.
 */
validateTestName(){
  if(!this.isTestResumed){
   this.apiService.genericGet(this.definedConstants.API_BASE_URL +
     this.definedConstants.API_FIND_BY_TEST_NAME + this.createNewProduct.value.testName).subscribe(
       response=>{
          if(response._embedded.tests.length>=1){
            this.createNewProduct.value.testName = "";
            this.isTestNameExists = true;
            this.createNewProduct.patchValue({ testName:'' });
            swal("","Test Already exists. Either Change the test name or edit existing","info");
            return false;
          }else{
            this.isTestNameExists = false;
            return true;
          }
          
       },error=>{
         this.isTestNameExists = false;
         console.error("Error Occured while vaidting the test ame existense.");
         return false;
       }
     )
  }
}
/**
 * Question is Added to Test
 */
addToTest(test){
  console.log(JSON.stringify(test));
  if(test.qCount == this.questionIdsCount){
    swal("Warning","No More questions can be added. Increase the question count or remove some question from test.","warning")
  }else{
    this.apiService.genericPost(this.definedConstants.API_BASE_URL+this.definedConstants.API_ADD_TO_TEST,test).subscribe( 
    response=>{
        console.log("Added to Test",response);
          swal("",response.message,response.type);
        if(response.type==="success"){
          this.questionIdsCount = response.qCount;
          this.testLink = this.definedConstants.API_BASE_URL+this.definedConstants.API_TEST +"/"+response.test;
        }
      },error=>{
        console.error("");
     })
  }
}
 publishTest(){
  console.log(this.createNewProduct.value);
  console.log(this.questionIdsCount)
   if(this.questionIdsCount == this.createNewProduct.value.totQ){
     let test = new Object();
     test["status"]=this.definedConstants.STATUS_ACTIVE;
     test["testAutoId"] = this.utilService.parseAutoId(this.testLink);
     console.log(test);
     swal({
       title:"Publishing the test.",
       text:"Please wait...",
       allowOutsideClick:false,
       onOpen:function(){
         swal.showLoading();
       }
     })
      this.apiService.genericPost(this.definedConstants.API_BASE_URL+this.definedConstants.API_UPDATE_TEST_STATUS,test).subscribe(
        response=>{
          swal.hideLoading();
        },error=>{
          swal("","Issue in publishing the test","error")
        })
      swal('','Successfully Published','success')
   }
   
  else
    swal('',"Question count can't be less than total added questions.",'warning')
 }
 validateTotalQuestion(){
   if(this.createNewProduct.value.totQ == 0){
      swal("","Question count should be greater than 0",'error');
      this.createNewProduct.patchValue({totQ:""});
   }else if(this.isTestResumed && this.createNewProduct.value.totQ < this.testUpdated.questionIds.length){
        this.createNewProduct.patchValue({totQ:this.testUpdated.qCount});
        swal("","Question count can't be less than total added questions. Resetting the Value",'error');
   }
 }

}
