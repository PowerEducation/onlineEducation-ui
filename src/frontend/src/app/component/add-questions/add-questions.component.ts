import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { DefinedConstants } from '../../app.defined.constants';
import {CommonUtilService} from '../../services/common-util.service';
import {CommonApiService} from '../../services/common-api.service';
import { SingleValuedModalComponent } from '../modal/single-valued-modal/single-valued-modal.component';
import {MatDialog} from '@angular/material';
import { Courses, Subjects, Topic } from '../../model/course.model';
import swal from 'sweetalert2';
import {Subscription} from "rxjs/Rx";

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css']
})
export class AddQuestionsComponent implements OnInit {

  constructor(public definedConstants: DefinedConstants, public utilService: CommonUtilService, 
  public apiService: CommonApiService, public dialog: MatDialog,public router: Router, public route: ActivatedRoute) {
   
  }
 
   public selectedSubject: string;
   public selectedChoice:string;
   public selectedTopic:string;
   public selectedLang:string;
   public selectedDiffLevel:string;
   public subjects:any = [];
   public choices:any=[];
   public topics:any=[]
   public tags:string="";
   public subscription: Subscription;
   public param:string="";
   public question:any;
   public isResetTriggered:boolean=false;

  ngOnInit() {
   
   this.subscription = this.route.queryParams.subscribe(
      queryParam=>{
        this.param =queryParam['view']
      });
      if(this.param !== undefined && this.param =="Edit"){
        this.question = JSON.parse(sessionStorage.getItem("tempQuestion"));
        this.selectedChoice = this.question.optionType;
      
      //  this.subjects.push({value:this.question._links.subject.href,viewValue:this.question.subject})
      //  this.selectedSubject =this.question._links.subject.href;
       this.selectedDiffLevel = this.question.difficultyLevel;
       
        this.apiService.genericGet(this.question._links.subject.href).subscribe( 
          res=>{
            this.subjects.push({value:res._links.subject.href,viewValue:res.subjectName})
              this.selectedSubject =res._links.subject.href;
        });
        this.apiService.genericGet(this.question._links.topic.href).subscribe( 
          response=>{
              this.topics.push({value:response._links.topic.href,viewValue:response.tNm});
              this.selectedTopic =response._links.topic.href;
              
        });
      }else{
        this.loadSubjects();
      }
    // this.tempTest();
  }

// tempTest(){

//   var file1 = window.URL.createObjectURL("F:\\Photos\\IMG_0185.JPG");//new File(['Blob'],"F:\\Photos\\IMG_0185.JPG",{
// //     type: "images/*" // optional - default = ''
// // });
// // var file = new File([],file1)
// console.log(file1)
//   // this.apiService.fileUploadPost(this.definedConstants.API_BASE_URL + this.definedConstants.API_TEST_UPLOAD, file)
//   //   .subscribe(
//   //     response=>{
//   //       console.log("Response")
//   //   });
// }
/**
 * Loads the Subjects from the Database
 */ 
  loadSubjects(){
    this.apiService.genericGet(this.definedConstants.API_BASE_URL+this.definedConstants.API_SUBJECTS).subscribe(
      response=>{
          response._embedded.subjects.forEach(subjects=>{
            this.subjects.push({value:subjects._links.self.href,viewValue:subjects.subjectName})
          });
          this.subjects.push({value:this.definedConstants.ADD_SUBJECT,viewValue:this.definedConstants.ADD_SUBJECT});
      },error=>{
        console.error("Error in Getting Response")
      });
  }

    subjectChanged(type){
    
    if(this.selectedSubject==this.definedConstants.ADD_SUBJECT){
      this.selectedSubject="";
       let dialogRef = this.dialog.open(SingleValuedModalComponent, {
      width: '600px',
      data: {'type':'Subject'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.value!=""){
        console.log('The dialog was closed'+JSON.stringify(result));
        // Save the Subject
        let subject =  new Subjects();
        subject.subjectName = result.value;
        console.log("Saved the Subject");
         this.subjects[this.subjects.length-1].value =  result.link;
        this.subjects[this.subjects.length-1].viewValue =  result.value;
        this.subjects.push({value:this.definedConstants.ADD_SUBJECT,viewValue:this.definedConstants.ADD_SUBJECT});
        this.selectedSubject =  result.value;
       
        swal("Subject Saved","Success")
      } 
    });
  }else{
    this.apiService.genericGet(this.selectedSubject+this.definedConstants.API_TOPIC).subscribe(
      resSubject=>{
         this.topics=[];
        resSubject._embedded.topics.forEach(topic=>{
          this.topics.push({value:topic._links.self.href,viewValue:topic.tNm});  
        })
        this.topics.push({value:this.definedConstants.ADD_TOPIC,viewValue:this.definedConstants.ADD_TOPIC})
      },error=>{
         console.error("Error in fetching Topics")
      });
  }
}
topicChanged(){
  if(this.selectedTopic==this.definedConstants.ADD_TOPIC){
    this.selectedTopic="";
       let dialogRef = this.dialog.open(SingleValuedModalComponent, {
      width: '600px',
      data: {'type':'Topic',
           'subject':this.selectedSubject,
           'topics':this.topics}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.value!=""){
        // Save the Topic
        let topic =  new Topic();
        topic.tNm = result.value;
        topic.subject = this.selectedSubject;
        this.topics[this.topics.length-1].value =  result.link;
        this.topics[this.topics.length-1].viewValue =  result.value;
        this.topics.push({value:this.definedConstants.ADD_TOPIC,viewValue:this.definedConstants.ADD_TOPIC});
        this.selectedTopic= result.value;
        swal("Saved the Topic","success")
      }
     });
    }
  }

  /**
   * Saving the question..
   */
  // saveQuestion(){
  //   // TODO Write Login for Saving a Question an add validation
  //   console.log("Saving the Question..");
  // }
  saveQuestion(event){
   let question = event;
   question.subject = this.selectedSubject;
   question.topic = this.selectedTopic;
   question.optionType = this.selectedChoice;
  //  question.langCd = this.selectedLang;
   question.difficultyLevel = this.selectedDiffLevel;
   if(this.param !== undefined && this.param =="Edit"){
     console.log(this.question._links.self.href  )
     console.log(question)
     this.apiService.genericPut(this.question._links.self.href,question).subscribe(
     response=>{
       this.isResetTriggered=true;
       console.log("Response",response);
       swal("Updated the Question","success")
     },error=>{
       swal("Issue in updating the Code..","error")
     });
   }else{
    this.apiService.genericPost(this.definedConstants.API_BASE_URL +this.definedConstants.API_QUESTIONS,question).subscribe(
     response=>{
       this.isResetTriggered=true;
       console.log("Response",response);
       swal("Saved the Question","success")
     },error=>{
       swal("Issue in saving the Code..","error")
     });
   }
   
    console.log(JSON.stringify(question));
  }

  backToQuestion(){
    this.utilService.qManagerView =true;
    this.utilService.addQuestionView =false;
    this.router.navigate(['/home'], { queryParams: { page:'questionManager'  } });
  }
}

