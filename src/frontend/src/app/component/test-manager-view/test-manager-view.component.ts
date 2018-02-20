import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { DefinedConstants } from '../../app.defined.constants';
import {CommonApiService} from '../../services/common-api.service';
import {CommonUtilService} from '../../services/common-util.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Test } from '../../model/course.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-test-manager-view',
  templateUrl: './test-manager-view.component.html',
  styleUrls: ['./test-manager-view.component.css']
})
export class TestManagerViewComponent implements OnInit {

  createNewTest: FormGroup;
  secondFormGroup: FormGroup;
  addQuestion: FormGroup;
  // public categories:any=[];
  public testName = new FormControl('',[Validators.required]);
  public testCategory = new FormControl('',[Validators.required]);
  public diffLevel = new FormControl('',[Validators.required]);
  public duration  = new FormControl('',[Validators.required]);
  public totQ = new FormControl('',[Validators.required]);
  public totM = new FormControl('',[Validators.required]);

  constructor(private _formBuilder: FormBuilder, private definedConstants: DefinedConstants,private utilService:CommonUtilService,
          private apiService:CommonApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.loadCategory();
    this.createNewTest = this._formBuilder.group({
      testName: this.testName,
      testCategory: this.testCategory,
      diffLevel: this.diffLevel,
      duration: this.duration,
      totQ: this.totQ,
      totM: this.totM
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.addQuestion = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    
  }
public userNameError:boolean=false;
saveProgress(){
  if(this.createNewTest.valid && this.validateTestName()){
    let test =  new Test();
    test.category = this.createNewTest.value.testCategory;
    test.testName = this.createNewTest.value.testName;
    test.diificultyLevel  = this.createNewTest.value.diffLevel;
    test.duration  = this.createNewTest.value.duration;
    test.totalMarks  = this.createNewTest.value.totM;
    test.qCount  = this.createNewTest.value.totQ;
    this.apiService.genericPost(this.definedConstants.API_BASE_URL+this.definedConstants.API_TEST,test).subscribe( 
      response=>{
        swal("","Saved current Proress","success");
      },error=>{
        console.error("","Error in Saving the Test Progress","error")
      }
    )
  }else{
    swal('','Missing out something in the form. Resolve them first.','error');
   this.createNewTest.controls.testName.errors.duplicate=true;
    console.log(this.createNewTest)
  }
  
}
validateTestName(){
  this.apiService.genericGet(this.definedConstants.API_BASE_URL +
   this.definedConstants.API_FIND_BY_TEST_NAME + this.createNewTest.value.testName).subscribe(
     response=>{
        if(response._embedded.tests.length>=1){
          this.createNewTest.value.testName = "";
          // this.testName.
          swal("","Test Already exists. Either Change the test name or edit existing","info");
          return false;
        }else
        return true;
     },error=>{
       return false;
     }
   )
  // 
}
  // numberValidator(control: FormControl): {[key: string]: any}{

  // }

  // loadCategory(){
  //   this.apiService.genericGet(this.definedConstants.API_BASE_URL+this.definedConstants.API_TEST_CATEGORY).subscribe(
  //     response=>{
  //         response._embedded.testProducts.forEach(testP=>{
  //           this.categories.push({value:testP._links.self.href,viewValue:testP.subjectName})
  //         });
  //         this.categories.push({value:this.definedConstants.ADD_CATEGORY,viewValue:this.definedConstants.ADD_CATEGORY});
  //     },error=>{
  //       console.error("Error in Getting Response")
  //     });
  // }
  // categoryChanged(){
  //   if(this.testCategory==this.definedConstants.ADD_CATEGORY){
  //     // this.utilService.testProductView =true;
  //     // this.utilService.testManagerView =false;
  //     this.utilService.viewSwitch(this.definedConstants.TEST_CATEGORY_VIEW);
  //     this.router.navigate(['/home'], { queryParams: { page:'addCategoryView'  } });
  //   }
  // }
}
