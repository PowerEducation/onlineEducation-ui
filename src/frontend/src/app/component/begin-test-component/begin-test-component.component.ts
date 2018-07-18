import { reset } from '@angular-devkit/core/src/terminal';
import { Component, OnInit,ViewChild } from '@angular/core';
import {CommonUtilService} from '../../services/common-util.service';
import {CommonApiService} from '../../services/common-api.service';
import {DefinedConstants} from "../../app.defined.constants";
import * as qAns from '../../../data/qAns.json';
import swal from 'sweetalert2';

@Component({
  selector: 'app-begin-test-component',
  templateUrl: './begin-test-component.component.html',
  styleUrls: ['./begin-test-component.component.css']
})
export class BeginTestComponentComponent implements OnInit {

  constructor(private utilService :CommonUtilService, private definedConstants: DefinedConstants,
              private apiService : CommonApiService) { }

  public qAns:any=[];
  public currentQAns:any=null;
  public curIndex=0;
  public maxIndex=0;
  public activeTests:any=[];
  public isTestStarted:boolean=false;
  public questions:any=[];
  public selectedQuestion:any;
  public previousEnabled:boolean=false;
  public nextEnabled:boolean=true;
  public stopWatchQ:string;
  public stopWatchP:string;
  public distanceP:number=0;
  public distanceQ:number=0;
  public resetQ;
  public resetP;
  public isScLoading:boolean=false;
  public showInstructions=false;

  ngOnInit() {
    this.getQAns();
    this.getAllActiveTest();

  }

  getAllActiveTest(){
    this.apiService.genericGet(this.definedConstants.API_BASE_URL+this.definedConstants.API_TEST_FIND_STATUS+this.definedConstants.STATUS_ACTIVE).subscribe(
      response=>{
        this.activeTests = response._embedded.tests;
        this.activeTests.map(test =>this.utilService.decodeLOB(test.questionIds));
      }
    )
    // API_TEST_FIND_STATUS
  }

  startTest(test){
    let questionIds =  JSON.parse(this.utilService.decodeLOB(test.questionIds));
    this.apiService.genericPost(this.definedConstants.API_BASE_URL+
    this.definedConstants.API_GET_ALL_QUESTION_FROM_TEST,test).subscribe(
      response=>{
        response.map(res=>{
           res.questions = JSON.parse(res.questions);
           res.answers = JSON.parse( res.answers);
           res.answers.map(ans=>{
             ans.userAns=false;
            ans.timeTaken=0});
           res.colorButton=this.definedConstants.BUTTON_UNANS;
           res.timeTaken=0;
           res.isAnswered=false;
        })
        this.questions = response;
     
        this.selectQuestion(this.questions[0],0);
    },error=>{

    });
  this.showInstruction();
    
  }
  showInstruction(){
    this.showInstructions=true;
    this.isTestStarted=false;
    clearInterval(this.resetP);
  }
  beginTest(){
    if(this.distanceP!=0){
      this.resetQ=true;
      this.resetP=true;
    }
    
    this.showInstructions=false;
    this.isTestStarted=true;
    // this.startTimer("p",this.distanceP);
    this.startTimer("p", this.distanceP);
    
    console.log("stopWatchP>>>",this.stopWatchP);
  }
  
  startTimer(type:string,preTimer:number){
    var count = 0;
    count = preTimer;
    if(type=="q"){
      // this.resetQ=false;
    
       
      }else if(type=="p"){
        
        // this.resetP=false;
        this.resetP= setInterval(()=> {
	      count = count+1;
        var distance = count;
    // Time calculations for days, hours, minutes and seconds
    var hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
    var minutes = Math.floor(distance % ( 60 * 60) / 60);
    var seconds = Math.floor(distance % (60) );
    // console.log("Distance>>"+distance)
    // Output the result in an element with id="demo"
    //  if(type=="q"){
    //    if(this.resetQ){
    //        clearInterval(x);
    //        this.resetP =false;
    //    }
        
    //    this.stopWatchQ = hours + "HH:: "    + minutes + "MM:: " + seconds + "SS";
    //    this.distanceQ = count;
    //   }else if(type=="p"){
        if(this.resetP){
           
           this.resetQ =false;
       }
        this.stopWatchP =  hours + "HH:: "    + minutes + "MM:: " + seconds + "SS";
        this.distanceP = count;
    // }
    
    // If the count down is over, write some text 
    }, 1000);
  }
// Update the count down every 1 second

  }
  getQAns(){
       this.apiService.genericMockedData(qAns).subscribe(
     response =>{
        this.qAns = response;
        this.maxIndex = this.qAns.length -1;
     },
   error=>{

   });
  }
  showQAns(event){
    this.curIndex = event;
    this.currentQAns = this.qAns[event];
  }

  skipQuestion(){
    if(this.curIndex === this.maxIndex){
      this.currentQAns = this.qAns[0];
      this.curIndex =0;
    } else {
      this.currentQAns = this.qAns[this.curIndex +1];
      this.curIndex = this.curIndex +1;
    }
  }
  selectQuestion(question,index){
    console.log("question>>",question)
    this.selectedQuestion = question;
    this.selectedQuestion.index = index+1;
    if(index==0){
      this.previousEnabled =false;
      this.nextEnabled =true;
    }else if(index==this.questions.length-1){
      this.previousEnabled =true;
      this.nextEnabled =false;
    }else{
      this.previousEnabled =true;
      this.nextEnabled =true;
    }
      
  }
  correctAnswerSelection (question,index){
    this.isScLoading = true;
    if(question.optionType=="sc"){
      question.answers.map(ans=>ans.userAns=false);
      question.answers[index].userAns = true;
      this.isScLoading = false;
    }else if(question.optionType=="mc"){
      if(question.answers[index].userAns)
        question.answers[index].userAns=false;
      else
        question.answers[index].userAns=true;
    }
  }
  tagQuestion(isTagged){
    if(isTagged){
      if(this.selectedQuestion.colorButton == this.definedConstants.BUTTON_ANS)
        this.selectedQuestion.colorButton = this.definedConstants.BUTTON_TAGGED_ANSWERED;
      else
        this.selectedQuestion.colorButton = this.definedConstants.BUTTON_TAGGED;
      this.selectedQuestion.status = "tagged";
    }else{
      if(this.selectedQuestion.colorButton == this.definedConstants.BUTTON_TAGGED_ANSWERED)
        this.selectedQuestion.colorButton = this.definedConstants.BUTTON_ANS;
      else
      this.selectedQuestion.colorButton = this.definedConstants.BUTTON_UNANS;
      this.selectedQuestion.status = "";
    }
  }

/**
 * clears the Answers to current question
 */
  clearAnswer(){
    this.selectedQuestion.answers.map(ans=>ans.userAns=false);
    if(this.selectedQuestion.colorButton == this.definedConstants.BUTTON_ANS)
      this.selectedQuestion.colorButton = this.definedConstants.BUTTON_UNANS;
    if(this.selectedQuestion.colorButton == this.definedConstants.BUTTON_TAGGED_ANSWERED)
      this.selectedQuestion.colorButton = this.definedConstants.BUTTON_TAGGED;
  }
  
  /**
   * Navigate to Previous or next questions set
   * @param mode -1 for previous and 1 for next
   */
  nextQuestion(mode){
    this.stopWatchQ="0HH:: 0MM:: 0SS";
    if(mode ==-1 || mode ==0){
      if(this.selectedQuestion.colorButton == this.definedConstants.BUTTON_TAGGED || this.selectedQuestion.colorButton == this.definedConstants.BUTTON_TAGGED_ANSWERED){
         if(this.selectedQuestion.answers.find(ans=>ans.userAns==true))
            this.selectedQuestion.colorButton = this.definedConstants.BUTTON_TAGGED_ANSWERED;
          else
            this.selectedQuestion.colorButton = this.definedConstants.BUTTON_TAGGED;
       }else{
         if(this.selectedQuestion.answers.find(ans=>ans.userAns==true))
            this.selectedQuestion.colorButton = this.definedConstants.BUTTON_ANS;
          else
            this.selectedQuestion.colorButton = this.definedConstants.BUTTON_UNANS;
       }
    }
    if(mode==-1){
    // Show Previous Question
      if(this.selectedQuestion.index !=0){
        this.selectQuestion(this.questions[this.selectedQuestion.index-2],this.selectedQuestion.index - 2) ;
       
      }
    }else if(mode==0){
      // Show Next Question
      if(this.selectedQuestion.index != this.questions.length+1){
        this.selectQuestion(this.questions[this.selectedQuestion.index],this.selectedQuestion.index) ;
      }
    }else if(mode==1){
    // Skipping the Question
    if( this.questions[this.selectedQuestion.index-1].status!=undefined)
      this.questions[this.selectedQuestion.index-1].status="skipped";
    // If Question has reached to last index
    if(this.selectedQuestion.index == this.questions.length){
        this.selectQuestion(this.questions[0],0);
      }else{
        this.selectQuestion(this.questions[this.selectedQuestion.index],this.selectedQuestion.index) ;
      }
    }
  }

/**
 * This will Submit the Test after proper validation..
 */
  submitTest(){
    if(this.selectedQuestion.colorButton == this.definedConstants.BUTTON_TAGGED || this.selectedQuestion.colorButton == this.definedConstants.BUTTON_TAGGED_ANSWERED){
         if(this.selectedQuestion.answers.find(ans=>ans.userAns==true))
            this.selectedQuestion.colorButton = this.definedConstants.BUTTON_TAGGED_ANSWERED;
          else
            this.selectedQuestion.colorButton = this.definedConstants.BUTTON_TAGGED;
       }else{
         if(this.selectedQuestion.answers.find(ans=>ans.userAns==true))
            this.selectedQuestion.colorButton = this.definedConstants.BUTTON_ANS;
          else
            this.selectedQuestion.colorButton = this.definedConstants.BUTTON_UNANS;
       }
    let tagged =0;
    let unAnswered =0;
    console.log("Submitting the Test",this.questions)
    this.questions.map(question=>{
      if(question.colorButton==this.definedConstants.BUTTON_TAGGED || question.colorButton==this.definedConstants.BUTTON_TAGGED_ANSWERED)
        tagged++;
      if(question.colorButton==this.definedConstants.BUTTON_UNANS || question.colorButton==this.definedConstants.BUTTON_TAGGED)  
        unAnswered ++;
    })
    let messageString:string;
    if(tagged ==0 && unAnswered == 0){
      messageString = "You answered all Questions"
    }else if(tagged !==0 && unAnswered !== 0){
      messageString = "You have un-answered questions:"+unAnswered + " and tagged questions:"+tagged;
    } else if(unAnswered != 0){
      messageString = "You have un-answered questions:"+unAnswered;
    }else{
      messageString = "You have tagged questions:"+tagged;
    }
    swal(messageString)
    console.log(unAnswered)
    console.log(tagged)
  }
  
}
