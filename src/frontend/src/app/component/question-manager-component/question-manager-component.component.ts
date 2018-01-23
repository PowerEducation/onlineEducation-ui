import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { DefinedConstants } from '../../app.defined.constants';
import {CommonUtilService} from '../../services/common-util.service';
import {CommonApiService} from '../../services/common-api.service';
import { SingleValuedModalComponent } from '../modal/single-valued-modal/single-valued-modal.component';
import {MatDialog} from '@angular/material';
import { Courses, Subjects, Topic } from '../../model/course.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-question-manager-component',
  templateUrl: './question-manager-component.component.html',
  styleUrls: ['./question-manager-component.component.css']
})
export class QuestionManagerComponentComponent implements OnInit {

  constructor(private zone:ChangeDetectorRef, private definedConstants: DefinedConstants, private utilService: CommonUtilService, 
  private apiService: CommonApiService, private router: Router, private route: ActivatedRoute,
  private dialog: MatDialog) { }

   public selectedSubject: string="";
   public selectedChoice:string="";
   public selectedTopic:string="";
   public subjects:any = [];
   public choices:any=[];
   public topics:any=[]
   public tags:string="";
   public outputQuestions:any=[];
   public outputAnswers:any=[]
   public isLoading:boolean=false;
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
      },error=>{
        console.error("Error in Getting Response")
      });
  }

  /**
   * GenericMethod
   */
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
        this.subjects[this.subjects.length-1].value =  result.link;
        this.subjects[this.subjects.length-1].viewValue = result.value;
        this.selectedSubject=result.link;
        this.subjects.push({value:this.definedConstants.ADD_SUBJECT,viewValue:this.definedConstants.ADD_SUBJECT})
        this.topics=[];
        this.topics.push({value:this.definedConstants.ADD_TOPIC,viewValue:this.definedConstants.ADD_TOPIC})
        swal("Subject Saved","Success")
      }else{
        this.selectedSubject="";
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
        this.topics[this.topics.length-1].value =  result.link;
        this.topics[this.topics.length-1].viewValue =  result.value;
        
        this.selectedTopic = result.value;
        this.topics.push({value:this.definedConstants.ADD_TOPIC,viewValue:this.definedConstants.ADD_TOPIC})
        swal("Saved the Topic","success")
      }
     });
    }
  }

  fetchQuestions(){
  //  public selectedSubject: string;
  //  public selectedChoice:string;
  //  public selectedTopic:string;
  //  public tags:string="";
  let isSelectionDone:boolean=false;
  let apiString:string;
  if(this.tags!==""){
    apiString=this.definedConstants.API_FIND_QUESTION_BY_TAG +this.tags;
    isSelectionDone=true;
  }else if(this.selectedSubject!="" && this.selectedSubject!=this.definedConstants.ADD_SUBJECT){
    apiString=this.definedConstants.API_FIND_QUESTION_BY_SUBJECT +this.selectedSubject;
    isSelectionDone=true;
  }
  if(this.tags!=="" && this.selectedSubject!="" && this.selectedSubject!=this.definedConstants.ADD_SUBJECT
           && this.selectedTopic!=this.definedConstants.ADD_TOPIC && this.selectedTopic!=""){
    apiString=this.definedConstants.API_FIND_QUESTION_BY_SUBJECT_A_TOPIC_A_TAG +this.selectedSubject + "&topic="+this.selectedTopic+"&tagId="+this.tags;
    isSelectionDone=true;
  } else if(this.tags!=="" && this.selectedSubject!="" && this.selectedSubject!=this.definedConstants.ADD_SUBJECT){
    apiString=this.definedConstants.API_FIND_QUESTION_BY_SUBJECT_A_TAG +this.selectedSubject + "&tagId="+this.tags;
    isSelectionDone=true;
  } 
  if(!isSelectionDone)
    swal("","Enter a Valid Selection","success")
    
    
    this.apiService.genericGet(this.definedConstants.API_BASE_URL+apiString).subscribe(
      response=>{
        response._embedded.questions.map(quet=>quet.question = decodeURIComponent(atob(quet.question)))
        this.outputQuestions = response._embedded.questions;
        
    })
    
  }

deleteQuestion(question,index){

  swal({
    title: "Are you sure?",
  text: "You will not be able to recover this Question!",
  type: "warning",
  showCancelButton: true,
  confirmButtonClass: "btn-danger",
  confirmButtonText: "Yes, delete it!",
  cancelButtonText: "No, cancel plx!"
  }).then((result)=>{
   if(result===true){
     this.isLoading=true;
     this.apiService.genericDelete(question._links.self.href).subscribe(
       response=>{
         
        //  this.outputQuestions=[];
         this.outputQuestions.splice(index,1);
          console.log(this.outputQuestions);
         
        this.zone.detectChanges();
         this.isLoading=false;
        //  this._ngZone.run(()=>this.outputQuestions.splice(index,1));
        //  swal("Deleted!", "Your Question has been deleted.", "success");
         
       }
     ),error=>{
       console.error("Error in Deleting:"+error);
       this.isLoading=false;
     }

   }
 
  })
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
}
