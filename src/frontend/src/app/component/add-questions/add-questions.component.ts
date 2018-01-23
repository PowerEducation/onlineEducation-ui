import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { DefinedConstants } from '../../app.defined.constants';
import {CommonUtilService} from '../../services/common-util.service';
import {CommonApiService} from '../../services/common-api.service';
import { SingleValuedModalComponent } from '../modal/single-valued-modal/single-valued-modal.component';
import {MatDialog} from '@angular/material';
import { Courses, Subjects, Topic } from '../../model/course.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css']
})
export class AddQuestionsComponent implements OnInit {

  constructor(private definedConstants: DefinedConstants, private utilService: CommonUtilService, 
  private apiService: CommonApiService, private dialog: MatDialog,private router: Router, private route: ActivatedRoute) {
   
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
   

  ngOnInit() {
    this.loadSubjects();
  }

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
          console.log("Subjects Are::"+JSON.stringify( this.subjects));
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
        this.selectedSubject =  result.value;
        this.subjects[this.subjects.length-1].value =  result.link;
        this.subjects[this.subjects.length-1].viewValue =  result.value;
        this.subjects.push({value:this.definedConstants.ADD_SUBJECT,viewValue:this.definedConstants.ADD_SUBJECT})
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
        this.selectedTopic= result.value;
        this.topics[this.topics.length-1].value =  result.links;
        this.topics[this.topics.length-1].viewValue =  result.value;
        this.topics.push({value:this.definedConstants.ADD_TOPIC,viewValue:this.definedConstants.ADD_TOPIC})
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
   question.langCd = this.selectedLang;
   question.difficultyLevel = this.selectedDiffLevel;
   console.log(JSON.stringify(question))
   this.apiService.genericPost(this.definedConstants.API_BASE_URL +this.definedConstants.API_QUESTIONS,question).subscribe(
     response=>{
       console.log("Response",response);
       swal("Saved the Question","success")
     },error=>{
       swal("Issue in saving the Code..","error")
     });
    console.log(JSON.stringify(question));
  }

  backToQuestion(){
    this.utilService.qManagerView =true;
    this.utilService.addQuestionView =false;
    this.router.navigate(['/home'], { queryParams: { page:'questionManager'  } });
  }
}

