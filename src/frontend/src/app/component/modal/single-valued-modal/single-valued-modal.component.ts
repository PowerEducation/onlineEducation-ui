import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA,ErrorStateMatcher} from '@angular/material';
import { Courses, Subjects, Topic } from '../../../model/course.model';
import { DefinedConstants } from '../../../app.defined.constants';
import {CommonUtilService} from '../../../services/common-util.service';
import {CommonApiService} from '../../../services/common-api.service';

@Component({
  moduleId: module.id,
  selector: 'app-single-valued-modal',
  templateUrl: './single-valued-modal.component.html',
  styleUrls: ['./single-valued-modal.component.css']
})
export class SingleValuedModalComponent implements OnInit {

  constructor(public dialog: MatDialogRef<SingleValuedModalComponent>, @Inject(MAT_DIALOG_DATA) public data:any,
  public definedConstants: DefinedConstants, public utilService: CommonUtilService, public apiService: CommonApiService,) 
  { }
  public typeInput="";
  public typeError:boolean=false;
  public isLoading:boolean=false;
  ngOnInit() {
    console.log(this.data)
  }

onNoClick(): void {
    this.dialog.close();
  }

  close(value,link){
    console.log(value.length)
    this.dialog.close({
      "type":this.data,
      "value" : value,
      "link":link
    });
  }

  saveData(){
   this.typeError=false;
    if(this.data.type=="Subject"){
      let subject =  new Subjects();
      subject.subjectName = this.typeInput;
      this.isLoading=true;
      this.apiService.genericGet(this.definedConstants.API_BASE_URL+this.definedConstants.API_SUBJECT_BY_NAME_FIND+ this.typeInput).subscribe(
        res=>{
          this.typeError=true;
          this.isLoading=false;
          console.log("Subject Already Exists")
          
        },error=>{
          console.log("Good To Save The Subject",error)
          this.apiService.genericPost(this.definedConstants.API_BASE_URL+this.definedConstants.API_SUBJECTS,subject).subscribe(
            response=>{
              console.log("Saved the Subject",response);
              this.close(response.subjectName,response._links.self.href);
              this.isLoading=false;
            },error=>{
                console.error("Error in Saving the Information",error);
            });
        });
     }else if(this.data.type=="Topic"){
        if(this.data.topics.find(topic=>topic.viewValue==this.typeInput)){
          this.typeError=true;
          console.log("Topic Exists")
        }else{
          let topic = new Topic();
          topic.tNm = this.typeInput;
          topic.subject = this.data.subject;
          this.apiService.genericPost(this.definedConstants.API_BASE_URL+this.definedConstants.API_TOPICS,topic).subscribe(
          response=>{
            console.log("Saved the Topic",response);
            this.close(response.tNm,response._links.self.href);
          },error=>{
            console.error("Issue in Saving the Topic");
          })
        }
     }

  }

}
