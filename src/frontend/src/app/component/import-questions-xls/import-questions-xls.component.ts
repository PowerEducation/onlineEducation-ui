import { Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable"
import { ActivatedRoute, Router } from '@angular/router';
import {CommonUtilService} from '../../services/common-util.service';
import {CommonApiService} from '../../services/common-api.service';
import {DefinedConstants} from "../../app.defined.constants";
import { Question,Answers } from '../../model/course.model';
import * as XLSX from 'xlsx';
import swal from 'sweetalert2';
import quill from 'Quill';

@Component({
  selector: 'app-import-questions-xls',
  templateUrl: './import-questions-xls.component.html',
  styleUrls: ['./import-questions-xls.component.css']
})
export class ImportQuestionsXlsComponent implements OnInit {
 constructor( private utilService :CommonUtilService, private definedConstants: DefinedConstants,
              private apiService : CommonApiService) {
    }


  ngOnInit() {
  }
public type:any;
public data: any;
public formattedData:any=[];
public isAllQSaved:boolean=false;
public isLoading:boolean=false;
  
	wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
	fileName: string = 'SheetJS.xlsx';

	onFileChange(evt: any) {
    console.log(evt)
		/* wire up file reader */
		const target: DataTransfer = <DataTransfer>(evt.target);
		if (target.files.length !== 1) throw new Error('Cannot use multiple files');
		const reader: FileReader = new FileReader();
		reader.onload = (e: any) => {
			/* read workbook */
			const bstr: string = e.target.result;
			const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

			/* grab first sheet */
			const wsname: string = wb.SheetNames[0];
			const ws: XLSX.WorkSheet = wb.Sheets[wsname];

			/* save data */
			this.data = (XLSX.utils.sheet_to_json(ws, {header: 1}));
      this.formatData(this.data);
		};
		reader.readAsBinaryString(target.files[0]);
	}

	export(): void {
		/* generate worksheet */
		const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

		/* generate workbook and add the worksheet */
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

		/* save to file */
		const wbout: ArrayBuffer = XLSX.write(wb, this.wopts);
		// saveAs(new Blob([wbout], { type: 'application/octet-stream' }), this.fileName);
	}
  
  formatData(data){
    if(data !==null && data.length>1){
     if(data[0].length==15){
      let tempData=data.splice(0,1);
      
      data.forEach(element => {
        let tempquestion = new Object();
        let counter=0;
        this.definedConstants.QUESTIONS_HEADER.forEach(head=>{
          tempquestion[head]=element[counter++];
        })
        tempquestion["hasError"]=false;
        tempquestion["errorText"]="You are Good to save this.";
        this.formattedData.push(tempquestion);
      });
     }else{
       swal("","Invalid Excel Sheet. Please try again with proper Header","error")
     }

     // for(let counter=0;counter<data.length;counter++){
      //   if(counter!=0){
      //     counter++;
      //     let tempObj=new Object();
      //     header.forEach(element => {
      //       tempObj[element] = data[counter][0]
      //     });
          
      //   }
      // };
    }

  }
  save(){
    console.log(JSON.stringify(this.formattedData))
    
    this.formattedData.forEach((data,index)=>{
      if(data.SUBJECTNAME!=undefined && data.SUBJECTNAME!=null && data.SUBJECTNAME!=""){
        //Find Subject Name or API Name
        let apiString=this.definedConstants.API_BASE_URL+this.definedConstants.API_SUBJECT_BY_NAME_FIND +data.SUBJECTNAME;
        this.apiService.genericGet(apiString).subscribe(
      resSub=>{
        console.log("Subjects are>>",resSub.subjectName);
        this.apiService.genericGet(this.definedConstants.API_BASE_URL+this.definedConstants.API_TOPIC_BY_SUBJECT+resSub._links.self.href).subscribe(
          resTopic=>{
            // return resTopic._embedded.topics;
            if(resTopic._embedded.topics.length==0){
               this.formattedData[index].errorText ="Subject doesn't have any topic."
               this.formattedData[index].hasError =true;
            }else{
              if(resTopic._embedded.topics.find(topic=>topic.tNm==data.TOPICNAME)){
                let question = new Question();
                question.question = btoa(encodeURIComponent(data.QUESTIONTEXT));
                question.subject =resSub._links.self.href;
                question.topic = (resTopic._embedded.topics.filter(topic=>topic.tNm==data.TOPICNAME))[0]._links.self.href;
                let answers:any = [];
                answers.push({"text":data.OPTION1,"index":0});
                answers.push({"text":data.OPTION2,"index":1});
                answers.push({"text":data.OPTION3,"index":2});
                answers.push({"text":data.OPTION4,"index":3});
                answers.push({"text":data.OPTION5,"index":4});
                answers.push({"text":data.OPTION6,"index":5});
                question.answers = btoa(encodeURIComponent(JSON.stringify(answers)));
                question.optionType=data.QUESTIONTYPE;
                question.correctAns=data.CORRECTANSWER;
                question.langCd="eng";
                question.expln=data.EXPLANATION;
                question.difficultyLevel=data.DIFFICULTYLEVEL;
                question.tagId=data.QUESTIONTAGS;
                this.apiService.genericPost(this.definedConstants.API_BASE_URL+this.definedConstants.API_QUESTIONS,question).subscribe(
                  response=>{
                    console.log("Saved the Question");
                    this.formattedData[index].hasError =false;
                    this.formattedData[index].errorText="Saved the Question."
                  },error=>{
                    swal("Issue in saving the Question")
                  });
                console.log(JSON.stringify(question));
              }

            }
    },error=>{
      console.error("Issue in Dealing with ");
    })
    },error=>{
      console.log("Subject Not Found")
      this.formattedData[index].errorText ="Subject Name doesn't exists.";
      this.formattedData[index].hasError =true;
      
    });
        // if(this.findSubjectANDTopic(data.SUBJECTNAME,index)){
        //   console.log("GOt the Subjects..",this.formattedData[index].resTopic)
        // }
        // else{
        //     console.log("GOt the Subjects..",data.SUBJECTNAME)
        // }
      }else{
        this.formattedData[index].errorText ="Subject Name is undefined."
        this.formattedData[index].hasError =true;
      }
  })
  }

  
  validateQuestions(){
     const subjectConst = this.formattedData.map(data => data.SUBJECTNAME +","+ data.TOPICNAME);
     let subjects = subjectConst.filter((x, i, a) => x && a.indexOf(x) === i);
     let subjectName = "";
     let topicName="";
     let subjectsNotFoud:any=[];
     let topicsNotFound:any=[];
     subjects.map((subj,index,array)=>{
       if(subj!=null && subj!=undefined && subj.split(",")[0]!=undefined){
         if(subj.split(",")[0]==subjectName){
            topicName=subj.split(",")[1]
            // Find By Topic Name
         }else{
          subjectName = subj.split(",")[0];
          topicName = subj.split(",")[1];
          // Find By Subject Name
          this.apiService.genericGet(this.definedConstants.API_BASE_URL+
          this.definedConstants.API_SUBJECT_BY_NAME_FIND+subjectName).subscribe(
            responseSubject=>{
              console.log("Subject Name>>",responseSubject)
              
              this.apiService.genericGet(this.definedConstants.API_BASE_URL+
              this.definedConstants.API_TOPIC_BY_NAME_FIND+subjectName).subscribe(
                responseTopic=>{
                  console.log("Topic Name>>",responseSubject);
                  console.log("Topic Name>>",index);
                  
                },error=>{
                  console.error("Error in Finding the Subject"+index)    
                });
            },error=>{
              subjectsNotFoud.push(array[index])
              // console.error(error)
              // console.error("Error in Finding the Subject",array[index])
            })
         }

       }
     })
  }

  validateSubjects(){
    const subjectConst = this.formattedData.map(data => data.SUBJECTNAME);
     let subjects = subjectConst.filter((x, i, a) => x && a.indexOf(x) === i);
     subjects.map((subject,index,array)=>{
        if(subject!=null && subject!=undefined){
          this.apiService.genericGet(this.definedConstants.API_BASE_URL+
          this.definedConstants.API_SUBJECT_BY_NAME_FIND+subject).subscribe(
          response=>{
          
          },error=>{
            swal("Subject Doesn't Exists. Please save the subject first.")
          }
          )
          
        }else{
          swal("Subject name is null or undefined, Please resolve the issue first.",array[index])
          return false;
        }
     })
  }
  fontFamilyEdit(){
    let font = quill.import('formats/font');
    font.whitelist = ['inconsolata', 'roboto', 'mirza', 'arial'];
  }


public toolbarOptions:any = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
];

public editorText = new quill('#editor', {
  modules: {
    toolbar: this.toolbarOptions
  },
  theme: 'snow'
});


deleteQuestion(index){
  this.isLoading =true;
  this.formattedData.splice(index,1);
  console.log(this.formattedData)
  this.isLoading =false;
}

}

