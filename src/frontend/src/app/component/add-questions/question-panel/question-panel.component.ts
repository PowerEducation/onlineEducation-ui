import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DefinedConstants } from '../../../app.defined.constants';
import { Answers, Question } from '../../../model/course.model';
import swal from 'sweetalert2';
@Component({
  selector: 'app-question-panel',
  templateUrl: './question-panel.component.html',
  styleUrls: ['./question-panel.component.css']
})
export class QuestionPanelComponent implements OnInit {

  constructor(private definedConstants: DefinedConstants) { }

  @Input() questionType:string;
  @Output() qData = new EventEmitter();
  public explanationText:string;
  public explanationValue:string;
  public tagText:string;
  public tagValue:string;
  public answers:any=[];
  public enteredQuestion:string="";
  public maxIndex:number;
  public correctAnswerIndex:any=[];

  ngOnInit() {
    this.explanationText=this.definedConstants.ADD_EPLN;
    this.tagText=this.definedConstants.ADD_TAG;
    this.loadAnswers();
    if(this.questionType===undefined)
      this.questionType="sc";
  }
 
  loadAnswers(){
     this.answers=[];
    if(this.questionType==="tf"){
       this.answers.push("True");
       this.answers.push("False");
    }else{
      this.maxIndex=3;
      let answer= new Answers();
      answer.index = 0;
      answer.text="";
      this.answers.push(answer);
      let answer1= new Answers();
      answer1.index = 1;
      answer1.text="";
      this.answers.push(answer1);
      let answer2= new Answers();
      answer2.index = 2;
      answer2.text="";
      this.answers.push(answer2);
      let answer3= new Answers();
      answer3.index = 3;
      answer3.text="";
      this.answers.push(answer3);
    }
  }
/**
 * It will  save the current selection of the answer, It will accept the index.
 */
  correctAnswerSelection(index)  {
    if(this.questionType=="sc"){
      this.correctAnswerIndex = [];
      this.correctAnswerIndex.push(index);
    }else if(this.questionType=="mc"){
      if(this.correctAnswerIndex.length==0){
        this.correctAnswerIndex=[];
        this.correctAnswerIndex.push(index);
      }
      else if(this.correctAnswerIndex.length >=1){
        let currLength = this.correctAnswerIndex.length;
        this.correctAnswerIndex =  this.correctAnswerIndex.filter(a=>a!=index)
        if(this.correctAnswerIndex.length===currLength)
           this.correctAnswerIndex.push(index);
      }
    }
    console.log(this.correctAnswerIndex)
      
  }
  addAnswer(){
    let answer =  new Answers();
    answer.index = this.maxIndex+1;
    answer.text="";
    this.answers.push(answer);
  }
  deleteAnswer(index){
    if(this.answers.length>2)
      this.answers.splice(index,1);
    else
      swal("There should be at least 2 answers. So you can't delete this.")
  }

  addExplanation(){
    if(this.explanationText ==this.definedConstants.ADD_EPLN){
      this.explanationValue ="";
       this.explanationText = this.definedConstants.REMOVE_EPLN;
    }
    else
      this.explanationText = this.definedConstants.ADD_EPLN;
  }
  addTag(){
    if(this.tagText ==this.definedConstants.ADD_TAG){
      this.tagValue ="";
       this.tagText = this.definedConstants.REMOVE_TAG;
    }
    else
      this.tagText = this.definedConstants.ADD_TAG;
  }
  saveQuestion(){
    if(this.isFormvalidated()){
      let question = new Question();
      question.question = btoa(encodeURIComponent(this.enteredQuestion));
      question.expln = this.explanationValue;
      question.tagId = this.tagValue;
      question.correctAns = this.correctAnswerIndex.toString();
      question.answers= btoa(encodeURIComponent(JSON.stringify(this.answers)));
      this.qData.emit(question);
    }
  }
  isFormvalidated(){
    let unAnsweredCount:number = 0;
    this.answers.forEach(element => {
    if(element.text=="")
       unAnsweredCount ++;
     });
   if(this.enteredQuestion==""){
     swal("Question details can't be blank. Please fill the question to complete.","error");
     return false;
   }else if(this.explanationText===this.definedConstants.REMOVE_EPLN && this.explanationValue==""){
      swal("Explanation can't be blank, If selected.","error");
      return false;
   }else if(this.tagText===this.definedConstants.REMOVE_TAG && this.tagValue==""){
      swal("Tag can't be blank, If selected.","error");
      return false;
   }else if(this.correctAnswerIndex.length==0){
        swal("Choose the correct Answer to continue.","error");
        return false;
   }else if(unAnsweredCount>=1){
        swal("Number of answers not updated "+unAnsweredCount +". Please update all of them.")
        return false;
      }
    else
      return true;
  }
}
