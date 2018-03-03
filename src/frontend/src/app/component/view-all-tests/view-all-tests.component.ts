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

  constructor( private definedConstants: DefinedConstants, private utilService: CommonUtilService, 
  private apiService: CommonApiService, private router: Router, private route: ActivatedRoute,
  private dialog: MatDialog) { }

  @Input() source:string;
  @Input() testValues;
   public selectedSubject: string="";
   public selectedChoice:string="";
   public selectedTopic:string="";
   public subjects:any = [];
   public tests:any = [];
   public choices:any=[];
   public topics:any=[]
   public category:string="";
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
            test.questionIds = JSON.parse(atob(test.questionIds));
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

}
