import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DefinedConstants } from '../../../app.defined.constants';
import { Answers, Question,EnteredQuestion } from '../../../model/course.model';
import {CommonUtilService} from '../../../services/common-util.service';
import {CommonApiService} from '../../../services/common-api.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-question-panel',
  templateUrl: './question-panel.component.html',
  styleUrls: ['./question-panel.component.css']
})
export class QuestionPanelComponent implements OnInit {

  constructor(public definedConstants: DefinedConstants, public utilService:CommonUtilService,
  public apiServie:CommonApiService) { }

  @Input() questionType:string;
  @Input() isResetTriggered:boolean;
  @Input() quesionData:any;
  @Output() qData = new EventEmitter();
  public explanationText:string;
  public explanationValue:string;
  public tagText:string;
  public tagValue:string;
  public answers:any=[];
  public enteredQuestion:string="";
  public maxIndex:number;
  public correctAnswerIndex:any=[];
  public langSelected:string="english";
  public questionText:any;
  public answersText:any;
  public isUpdateMode:boolean=false;

  ngOnInit() {
    this.explanationText=this.definedConstants.ADD_EPLN;
    this.tagText=this.definedConstants.ADD_TAG;
    if(this.quesionData!=undefined){
        this.answers = this.quesionData.answers.eng;
        this.enteredQuestion = this.quesionData.question.eng;
        this.questionText = this.quesionData.question;
        this.answers = this.quesionData.answers;
        this.isUpdateMode = true;
        this.maxIndex = this.answers.length -1;

    }else{
      this.maxIndex=3;
      this.loadAnswers();
    }
    
    if(this.questionType===undefined)
      this.questionType="sc";
    if(this.isResetTriggered)
      this.resetPage();
  }
 
  loadAnswers(){
     this.answers=[];
    if(this.questionType==="tf"){
       this.answers.push("True");
       this.answers.push("False");
    }else{
      for(let i=0;i<=this.maxIndex;i++){
        let answer= new Answers();
        answer.index = i;
        answer.textE="";
        answer.textH="";
        this.answers.push(answer);
      }
      
      
      // let answer1= new Answers();
      // answer1.index = 1;
      // answer1.text="";
      // answer1.textH="";
      // this.answers.push(answer1);
      // let answer2= new Answers();
      // answer2.index = 2;
      // answer2.text="";
      // answer2.textH="";
      // this.answers.push(answer2);
      // let answer3= new Answers();
      // answer3.index = 3;
      // answer3.text="";
      // answer3.textH="";
      // this.answers.push(answer3);
    }
  }
/**
 * It will  save the current selection of the answer, It will accept the index.
 */
  correctAnswerSelection(index)  {
    if(this.questionType=="sc"){
      this.answers.map(ans=>{ans.isC=false});
      // this.correctAnswerIndex = [];
      // this.correctAnswerIndex.push(index);
      this.answers[index].isC=true;
    }else if(this.questionType=="mc"){
      // if(this.correctAnswerIndex.length==0){
        // this.correctAnswerIndex=[];
        // this.correctAnswerIndex.push(index);
        this.answers[index].isC=true;
      // }
      // else if(this.correctAnswerIndex.length >=1){
      //   let currLength = this.correctAnswerIndex.length;
      //   this.correctAnswerIndex =  this.correctAnswerIndex.filter(a=>a!=index)
      //   if(this.correctAnswerIndex.length===currLength)
      //      this.correctAnswerIndex.push(index);
      // }
    }
    console.log(this.correctAnswerIndex)
      
  }
  addAnswer(){
    let answer =  new Answers();
    answer.index = this.maxIndex+1;
    answer.textE="";
    answer.textH="";
    answer.isC=false;
    this.answers.push(answer);
    // if(this.answersText!=undefined && this.answersText!=""){
    //   let answer1 =  new Answers();
    //     answer1.index = this.maxIndex+1;
    //     answer1.textE="";
    //     answer1.textH="";
    //     answer1.isC=false;
    //   this.answersText.push(answer1);
    // }
  }
  deleteAnswer(index){
    if(this.answers.length>2){
       this.answers.splice(index,1);
      // if(this.answersText!=undefined && this.answersText!=""){
      //   this.answersText.splice(index,1);
      // }
    }
     
    else
      swal("There should be at least 2 answers. So you can't delete this.")
    
    // if(this.questionType=="sc"){
    //   if(this.correctAnswerIndex[0] !=undefined && this.correctAnswerIndex[0]>index)
    //     this.correctAnswerIndex[0] = this.correctAnswerIndex[0] -1;
    //   else if(this.correctAnswerIndex[0] !=undefined && this.correctAnswerIndex[0] == index)
    //     this.correctAnswerIndex[0] = -1;   
    // }
    
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
    this.correctAnswerIndex=[];
    let index=0;
    this.answers.map(ans=>{
      ans.index= index++;
      if(ans.isC)
        this.correctAnswerIndex.push(ans.index+1);
    });
    if(this.isFormvalidated()){
      let question = new Question();
      if(this.questionText==undefined)
        this.questionText = new Object();
      this.questionText.eng = this.enteredQuestion;
      // this.questionText.
      question.question = this.utilService.encodeLOB(JSON.stringify(this.questionText));
      question.expln = this.explanationValue;
      question.tagId = this.tagValue;
      question.correctAns = this.correctAnswerIndex.toString();
      question.answers= this.utilService.encodeLOB(JSON.stringify(this.answers));
      this.qData.emit(question);
    }
  }
  isFormvalidated(){
    this.enteredQuestion = this.parseImageTag(this.enteredQuestion)
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
  resetPage(){
    this.enteredQuestion = "";
    this.answers.map(ans=>ans.text=ans.textH="");
  }
    switchLang(type){
      if(type=="hindi"){
        if(this.questionType=="" || this.answers.find(ans=>ans.text==""))
          swal("","Please fill all the details","warning")
        else{
          if(this.questionText==undefined){
            this.questionText = new Object();
            this.questionText.eng = this.enteredQuestion;
            this.enteredQuestion = "";
          }else if(this.questionText.hin!=undefined){
            this.questionText.eng = this.enteredQuestion;
            this.enteredQuestion = this.questionText.hin;
          }
            
          // this.answersText.  
          // if(this.answersText == undefined){
          //   this.answersText =  new Object();
          //   this.maxIndex = this.answers.length-1;
          //   this.answersText.eng = this.answers;
          //   this.loadAnswers();
          // } else if(this.answersText.hin != undefined){
          //   this.answersText.eng = this.answers;
          //   this.answers = this.answersText.hin;    
          // }
          this.langSelected = "hindi";
        }
      }
      else if(type=="english"){
        this.langSelected = "english";
        this.questionText.hin = this.enteredQuestion;
      //   this.answersText.hin = this.answers;
      //   this.answers = this.answersText.eng;
        this.enteredQuestion = this.questionText.eng;
      }
        
    }
    selectedFile: File;
    onFileChanged(event) {
      this.selectedFile = event.target.files;
      console.log(event);
      console.log(event.target);

      console.log(this.selectedFile);
      let i=0;
      for(let i=0;i<event.target.files.length;i++) {
        this.apiServie.fileUploadPost(this.definedConstants.API_BASE_URL + this.definedConstants.API_TEST_UPLOAD, event.target.files[i])
        .subscribe( response=>{
          console.log("Response")
      });    
      };
    
  }
  /**
   * 
   * @param tag Parsing the Image Tag if there is a image.
   */
    parseImageTag(tag:string):string{
    var occu = tag.indexOf("<input");
    if(occu !==-1){
      var imageTag=tag.substring(occu,tag.indexOf("/>",occu) +2).replace("<input","<img").slice(0,-15)+"/>";
      var width = ""; var heigth="";
      if(imageTag.indexOf(" width:")!==-1)
       width = imageTag.substring(imageTag.indexOf(" width:")+7,imageTag.indexOf("px",imageTag.indexOf(" width:"))).trim();
      else
        width = imageTag.substring(imageTag.indexOf("width:")+7,imageTag.indexOf("px",imageTag.indexOf("width:"))).trim();
      if(imageTag.indexOf(" height:")!==-1)
        heigth =imageTag.substring(imageTag.indexOf(" height:")+8,imageTag.indexOf("px",imageTag.indexOf(" height:"))).trim();
      else
        heigth =imageTag.substring(imageTag.indexOf("height:")+8,imageTag.indexOf("px",imageTag.indexOf("height:"))).trim();
        
      var imageTag1 = imageTag.slice(0,imageTag.indexOf("style="))+"width=\""+width +"px\" heigth=\""+heigth+"px\" />";
      var finalTag=tag.slice(0,occu)+imageTag1+tag.slice(tag.indexOf("/>",occu) +2);
      return finalTag;
    }else{
      return tag;
    }
    
  }
}
