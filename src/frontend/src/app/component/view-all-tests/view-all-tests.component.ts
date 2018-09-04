import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { DefinedConstants } from '../../app.defined.constants';
import {CommonUtilService} from '../../services/common-util.service';
import {CommonApiService} from '../../services/common-api.service';
import { SingleValuedModalComponent } from '../modal/single-valued-modal/single-valued-modal.component';
import {MatDialog} from '@angular/material';
import { Courses, Subjects, Topic, Test} from '../../model/course.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-view-all-tests',
  templateUrl: './view-all-tests.component.html',
  styleUrls: ['./view-all-tests.component.css']
})
export class ViewAllTestsComponent implements OnInit {

  constructor(public definedConstants: DefinedConstants, public utilService: CommonUtilService, 
  public apiService: CommonApiService, public router: Router, public route: ActivatedRoute,
  public dialog: MatDialog) { }

  @Input() source:string;
  @Input() testValues;
   public tests:any = [];
   public category:string="";
   public testName:string="";
   public outputQuestions:any=[];
   public outputAnswers:any=[]
   public isLoading:boolean=false;
  ngOnInit() {
    this.loadTests();
  }


/**
 * Loads the Subjects from the Database
 */ 
 loadTests(){
    this.apiService.genericGet(this.definedConstants.API_BASE_URL+this.definedConstants.API_TEST).subscribe(
      response=>{
        response._embedded.tests.map(test=>{
          if(test.questionIds!=="")
            test.questionIds = JSON.parse(this.utilService.decodeLOB(test.questionIds));
        })
        this.tests = response._embedded.tests;
      },error=>{
        console.error("Error in Getting Response")
      });
  }

 
  navigateToAddQ(){
    this.utilService.qManagerView =false;
    this.utilService.addQuestionView =true;
    this.router.navigate(['/home'], { queryParams: { page:'addQuestionsView'  } });
    console.log("Moving to Add Questions..");
  }

  showAnswer(ques){
    console.log("question",ques);
  }
  rowExpand(){
    console.log("Row Expansion");

  }
   deleteTest(test,index){
    swal({
    title: "Are you sure?",
    text: "You will not be able to recover this Test!",
    type: "warning",
    showCancelButton: true,
    confirmButtonClass: "btn-danger",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel plx!"
  }).then((result)=>{
   if(result===true){
     this.isLoading=true;
     console.log("Deleting")
     this.apiService.genericDelete(test._links.self.href).subscribe(
       response=>{
         this.tests.splice(index,1);
         this.isLoading=false;
        swal("Deleted!", "Your Test has been deleted.", "success");
       }
     ,error=>{
       console.error("Error in Deleting:"+error);
       this.isLoading=false;
     })
     }
   })
  }
   
   

  /**
   * Resume the Test In Case status is Pending
   */
  resumeTest(test,index){
    this.utilService.isTestResumed.push({"testResumed":true});
    this.utilService.isTestResumed.push(test);
    console.log(test)
    this.utilService.viewSwitch(this.definedConstants.TEST_MANAGER_VIEW)
    this.router.navigate(['/home'], { queryParams: { page:this.definedConstants.TEST_MANAGER_VIEW  } });
  }

  /**
   * Remove Question from the Test.
   */
  removeQuestion(test,testIndex,question,index){
  this.isLoading=true;
    let temObj=  new Object();
    temObj["testAutoId"]=this.utilService.parseAutoId(test._links.self.href);
    temObj["questionAutoId"]=question.id;
    temObj["index"]=index;
    temObj["status"]=this.definedConstants.STATUS_PENDING;
    if(test.status==this.definedConstants.STATUS_ACTIVE){
      this.isLoading=false;
      swal({
        title: 'Are you sure?',
        text: "Test is already published. Removal of questions, will set the status to pending.",
        type: 'warning',
        confirmButtonColor: '#3085d6',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonText: 'delete it!',
        cancelButtonText: 'No, cancel!',
        buttonsStyling: false,
        reverseButtons: true
      }).then((result) => {
          if (result == true) {
            this.isLoading=true;
            this.apiService.genericPost(this.definedConstants.API_BASE_URL+this.definedConstants.API_REMOVE_FROM_TEST,temObj).subscribe(
              response=>{
                this.tests[testIndex].questionIds.splice(index,1);
                this.isLoading=false;
                swal("sucess","Test Is marked as Pending. "+response.message,response.type)
                
            },error=>{
               this.isLoading=false;
                swal("","Error in removing the question from test. something went wrong.","error");
            });
          } else  {
              swal('Cancelled','Nothing Changed','warning')
          }
        })
    }else{
      // this.isLoading=true;
      this.apiService.genericPost(this.definedConstants.API_BASE_URL+this.definedConstants.API_REMOVE_FROM_TEST,temObj).subscribe(
      response=>{
        this.tests[testIndex].questionIds.splice(index,1);
        this.isLoading=false;
        swal("",response.message,response.type)
      },error=>{
         this.isLoading=false;
        swal("","Error in removing the question from test. something went wrong.","error");
      });
    }
  }
  /**
   * It fetches the Tests for meeting criteria.
   */
  fetchTests(){
    let apiString:string="";
    if(this.category!=="" && this.testName!=""){
      apiString=this.definedConstants.API_FIND_TEST_BY_TESTNAME_CATE+this.testName+
      "&category="+this.category;
    }else if(this.testName!="")
      apiString=this.definedConstants.API_FIND_TEST_BY_TESTNAME+this.testName;
    else if(this.category!="")
      apiString=this.definedConstants.API_FIND_TEST_BY_CATE+this.category;
    this.apiService.genericGet(this.definedConstants.API_BASE_URL + apiString).subscribe(
      response=>{
        console.log(response);
         response._embedded.tests.map(test=>{
          if(test.questionIds!=="")
            test.questionIds = JSON.parse(this.utilService.decodeLOB(test.questionIds));
        })
        this.tests = response._embedded.tests;
    },error=>{
      swal("","Error in finding the Test. Possibly Network Error.","error")
    });
  }
}
