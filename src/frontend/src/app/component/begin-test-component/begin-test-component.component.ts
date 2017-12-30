import { Component, OnInit } from '@angular/core';
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

  ngOnInit() {
    this.getQAns();
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
}
