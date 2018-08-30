import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { DefinedConstants } from '../../app.defined.constants';
import {CommonUtilService} from '../../services/common-util.service';
import {CommonApiService} from '../../services/common-api.service';
import { SingleValuedModalComponent } from '../modal/single-valued-modal/single-valued-modal.component';
import {MatDialog} from '@angular/material';
import { Courses, Subjects, Topic, Test} from '../../model/course.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-question-manager-component',
  templateUrl: './question-manager-component.component.html',
  styleUrls: ['./question-manager-component.component.css']
})
export class QuestionManagerComponentComponent implements OnInit {

  constructor( public definedConstants: DefinedConstants, public utilService: CommonUtilService, 
  public apiService: CommonApiService, public router: Router, public route: ActivatedRoute,
  public dialog: MatDialog) { }

  @Input() source:string;
  @Input() testValues;
  @Input() questionAdded;
  @Output() testQuestionData =  new EventEmitter();
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
   public subscription;
   public selectAll:boolean=false;
  ngOnInit() {
    this.subscription =  this.route.queryParams.subscribe(
      queryParam => {
      }
    )
    this.loadSubjects();
    console.log(this.testValues)
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
        this.selectedTopic="";
        this.outputQuestions=[];
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
  let apiString:string;
  if(this.tags!==""){
    apiString=this.definedConstants.API_FIND_QUESTION_BY_TAG +this.tags;
    if(this.selectedSubject!="" && this.selectedSubject!=this.definedConstants.ADD_SUBJECT
           && this.selectedTopic!=this.definedConstants.ADD_TOPIC && this.selectedTopic!="" && this.selectedChoice!=""){
              apiString=this.definedConstants.API_FIND_QUESTION_BY_SUBJECT_A_TOPIC_A_TAG_A_OPTIONTYP +this.selectedSubject;
              apiString= apiString+"&topic="+this.selectedTopic;
              apiString= apiString+"&tagId="+this.tags;
              apiString= apiString+"&optionType="+this.selectedChoice;
           }
           else if(this.selectedSubject!="" && this.selectedSubject!=this.definedConstants.ADD_SUBJECT
           && this.selectedTopic!=this.definedConstants.ADD_TOPIC && this.selectedTopic!="" && this.selectedChoice!=""){
               apiString=this.definedConstants.API_FIND_QUESTION_BY_SUBJECT_A_TOPIC_A_TAG +this.selectedSubject;
              apiString= apiString+"&topic="+this.selectedTopic;
              apiString= apiString+"&tagId="+this.tags;
           } else if(this.selectedSubject!="" && this.selectedSubject!=this.definedConstants.ADD_SUBJECT){
              apiString=this.definedConstants.API_FIND_QUESTION_BY_SUBJECT_A_TAG +this.selectedSubject;  
              apiString= apiString+"&tagId="+this.tags;
    } 
  }else if(this.selectedSubject!="" && this.selectedSubject!=this.definedConstants.ADD_SUBJECT){
    apiString=this.definedConstants.API_FIND_QUESTION_BY_SUBJECT +this.selectedSubject;
    if(this.selectedTopic!=this.definedConstants.ADD_TOPIC && this.selectedTopic!="" && this.selectedChoice!=""){
        apiString=this.definedConstants.API_FIND_QUESTION_BY_SUBJECT_A_TOPIC_A_OPTIONTYP +this.selectedSubject;
        apiString= apiString+"&topic="+this.selectedTopic;
        apiString= apiString+"&optionType="+this.selectedChoice;
    }else if(this.selectedTopic!=this.definedConstants.ADD_TOPIC && this.selectedTopic!=""){
      apiString=this.definedConstants.API_FIND_QUESTION_BY_SUBJECT_A_TOPIC +this.selectedSubject;
      apiString= apiString+"&topic="+this.selectedTopic;
    }
  }else
    swal("","Enter a Valid Selection","success")
    this.apiService.genericGet(this.definedConstants.API_BASE_URL+apiString).subscribe(
      response=>{
        response._embedded.questions.map(quet=>{
          quet.question = JSON.parse(this.utilService.decodeLOB(quet.question));
          quet.subjectHref = this.selectedSubject;
          quet.subject = (this.subjects.filter(subject=>subject.value==this.selectedSubject))[0].viewValue;
          quet.answers = JSON.parse(this.utilService.decodeLOB(quet.answers));
        });
        this.outputQuestions = response._embedded.questions;
        if(this.utilService.testManagerView)
          this.outputQuestions.map(question=>question.checked=false)
        
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
         
        // this.zone.detectChanges();
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
  rowExpand(){
    console.log("Row Expansion");
  }
  editQuestion (question){
    sessionStorage.setItem("tempQuestion",JSON.stringify(question))
    this.utilService.qManagerView =false;
    this.utilService.addQuestionView =true;
    this.router.navigate(['/home'], { queryParams: { page:'addQuestionsView',view:'Edit'  } });
    
  }
  addToTest(question,index){
    let questionIds:any= [];
    questionIds.push({"id":this.utilService.parseAutoId(question._links.self.href),
                      "qText":question.question,
                      "subject":question.subject});
    let test =  new Test();
    test.category = this.testValues.testCategory;
    test.testName = this.testValues.testName;
    test.diificultyLevel  = this.testValues.
    diffLevel;
    test.duration  = this.testValues.duration;
    test.totalMarks  = this.testValues.totM;
    test.qCount  = this.testValues.totQ;
    test.questionIds = this.utilService.encodeLOB(JSON.stringify(questionIds));
    test.addIfNotExists = true;
    this.testQuestionData.emit(test);
  }
  selectQuestions(selectedQuestion,indexAns){
    if(this.outputQuestions[indexAns].checked)
      this.outputQuestions[indexAns].checked = false;
    else
      this.outputQuestions[indexAns].checked = true; 
    // console.log(this.outputQuestions[indexAns].checked ?false:true)
    //  this.outputQuestions[indexAns].checked = this.outputQuestions[indexAns].checked ?false:true;
     console.log(this.outputQuestions[indexAns].checked);
  }
  selectAllQuestion(isSelectAll){
    if(isSelectAll){
       this.outputQuestions.map(question=>question.checked=true);
       this.selectAll =true;
    }
    else{
        this.outputQuestions.map(question=>question.checked=false);
        this.selectAll =false;
    }
      
    
  }
  saveSelectedQuestion(){
     let questionCount = 0;
     this.outputQuestions.map(question=>{
       if(question.checked)
         questionCount++;
      });
      if(questionCount + this.questionAdded <= this.testValues.totQ){
        console.log("Saving questions");
        let counter=0;
        this.outputQuestions.map(question=>{
        
          if(question.checked){
            this.addToTest(question,counter);
          }
          counter++;
        })
      }else{
        console.log("Can't Add Questions");
        let tempString  = "Can't add "+questionCount +" questions. Increase the question count or remove some question from test."
         swal("Warning",tempString,"warning")
      }

    console.log(this.outputQuestions);
    console.log(this.questionAdded);
    console.log(this.testValues.totQ);
  }
}
