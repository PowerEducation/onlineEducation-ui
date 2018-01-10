import { Component, OnInit } from '@angular/core';
import { DefinedConstants } from '../../app.defined.constants';
import {CommonUtilService} from '../../services/common-util.service';
import {CommonApiService} from '../../services/common-api.service';
import { SingleValuedModalComponent } from '../modal/single-valued-modal/single-valued-modal.component';
import {MatDialog} from '@angular/material';
import { Users, UsersInfo } from '../../../model/course.model';

@Component({
  selector: 'app-question-manager-component',
  templateUrl: './question-manager-component.component.html',
  styleUrls: ['./question-manager-component.component.css']
})
export class QuestionManagerComponentComponent implements OnInit {

  constructor(private definedConstants: DefinedConstants, private utilService: CommonUtilService, private apiService: CommonApiService,
  private dialog: MatDialog) { }

   selectedCourse: string;
   public courses:any = [];
  ngOnInit() {
    this.loadSubjects();
  }

/**
 * Loads the Subjects from the Database
 */ 
  loadSubjects(){
    this.apiService.genericGet(this.definedConstants.API_BASE_URL+this.definedConstants.API_COURSES).subscribe(
      response=>{
          console.log("Got ALL the Subjects"+JSON.stringify(response));
          response._embedded.courses.forEach(course=>{
            this.courses.push({value:course.cNm,viewValue:course.cNm})
          });
          this.courses.push({value:this.definedConstants.ADD_COURSE,viewValue:this.definedConstants.ADD_COURSE})
      },error=>{
        console.error("Error in Getting Response")
      });
  }

  /**
   * GenericMethod
   */
  subjectChanged(){
    if(this.selectedCourse==this.definedConstants.ADD_COURSE){
      console.log("Add Course Request");
       let dialogRef = this.dialog.open(SingleValuedModalComponent, {
      width: '600px',
      data: {'type':'Course'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.value!=""){
        console.log('The dialog was closed'+JSON.stringify(result));
        // Save the Subject
        let course =  new Object();
        course.cNm = result.subject;
        this.apiService.genericPost(this.definedConstants.API_BASE_URL+this.definedConstants.API_COURSES,course).subscribe(
          response=>{
            console.log("Saved the Subject",response);
            let tempObj = new Object();
             tempObj.value = response.cNm;
             tempObj.viewValue = response.cNm;
            this.courses[this.courses.length-1].value =  response.cNm;
            this.courses[this.courses.length-1].viewValue =  response.cNm;
            this.courses.push({value:this.definedConstants.ADD_COURSE,viewValue:this.definedConstants.ADD_COURSE})
          },error=>{
            console.error("Error in Saving the Information",error);
          }
        )
      }
      
      
    });
      
  }
}
