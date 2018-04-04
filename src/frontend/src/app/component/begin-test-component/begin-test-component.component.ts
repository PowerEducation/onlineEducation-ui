import { Component, OnInit,ViewChild } from '@angular/core';
import {CommonUtilService} from '../../services/common-util.service';
import {CommonApiService} from '../../services/common-api.service';
import {DefinedConstants} from "../../app.defined.constants";
import * as qAns from '../../../data/qAns.json';

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
           res.questions = JSON.parse( res.questions);
           res.answers = JSON.parse( res.answers);
        })
        this.questions = response;
     
        this.selectQuestion(this.questions[0],0);
    },error=>{

    });
    this.isTestStarted=true;
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
    
  }
  nextQuestion(mode){
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
}
