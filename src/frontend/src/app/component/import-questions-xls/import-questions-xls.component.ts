import { Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable"
import { ActivatedRoute, Router } from '@angular/router';
import {CommonUtilService} from '../../services/common-util.service';
import {CommonApiService} from '../../services/common-api.service';
import {DefinedConstants} from "../../app.defined.constants";
import { Question,Answers,QAnsLang } from '../../model/course.model';
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
public isRefresh:boolean = true;  
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
    this.isRefresh= false;
    if(data !==null && data.length>1){
     if(data[0].length==22){
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
       swal("","Invalid Excel Sheet. Please try again with proper Header","error");
       this.isRefresh= true;
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
      if(data.SUBJECTNAME!=undefined && data.SUBJECTNAME!=null && data.SUBJECTNAME!="" && data.SUBJECTNAME!="NA"){
        //Find Subject Name or API Name
        let apiString=this.definedConstants.API_BASE_URL+this.definedConstants.API_SUBJECT_BY_NAME_FIND +data.SUBJECTNAME;
        this.apiService.genericGet(apiString).subscribe(
      resSub=>{
        console.log("Subjects are>>",resSub.subjectName);
        this.apiService.genericGet(this.definedConstants.API_BASE_URL+this.definedConstants.API_TOPIC_BY_SUBJECT+resSub._links.self.href).subscribe(
          resTopic=>{
            // return resTopic._embedded.topics;
            if(resTopic._embedded.topics.length==0){
               this.formattedData[index].errorText ="Subject doesn't have any topic in backend database."
               this.formattedData[index].hasError =true;
            }else if(data.TOPICNAME==undefined || data.TOPICNAME==null || data.TOPICNAME=="" || data.TOPICNAME=="NA"){
              this.formattedData[index].errorText ="Topic name is undefined or blank."
              this.formattedData[index].hasError =true;
            }else if(data.OPTION1==undefined || data.OPTION1==null || data.OPTION1=="" || data.OPTION1=="NA" || 
                     data.OPTION2==undefined || data.OPTION2==null || data.OPTION2=="" || data.OPTION2=="NA" ){
              this.formattedData[index].errorText ="At least two answers options must present."
              this.formattedData[index].hasError =true;
            }
            else{
              if(resTopic._embedded.topics.find(topic=>topic.tNm==data.TOPICNAME)){
                let question = new Question();
                let quesText =  new QAnsLang();
                quesText.eng= data.QUESTIONTEXT;
                quesText.hin= data.QUESTIONTEXTH;
                question.question = this.utilService.encodeLOB(JSON.stringify(quesText));
                question.subject =resSub._links.self.href;
                question.topic = (resTopic._embedded.topics.filter(topic=>topic.tNm==data.TOPICNAME))[0]._links.self.href;

                let answers:any = [];
                answers.push({"textE":data.OPTION1,"index":0,"textH":data.OPTION1H,"isC":false});
                answers.push({"textE":data.OPTION2,"index":1,"textH":data.OPTION2H,"isC":false});
                if(data.OPTION3!=undefined && data.OPTION3!=null && data.OPTION3 !="" && data.OPTION3 !="NA"){
                  if(data.OPTION3H!=undefined && data.OPTION3H!=null && data.OPTION3H !="" && data.OPTION3H !="NA")
                      answers.push({"textE":data.OPTION3,"index":2,"textH":data.OPTION3H,"isC":false});
                  else
                    answers.push({"textE":data.OPTION3,"index":2,"isC":false});
                }
                if(data.OPTION4!=undefined && data.OPTION4!=null && data.OPTION4 !="" && data.OPTION4 !="NA"){
                  if(data.OPTION4H!=undefined && data.OPTION4H !=null && data.OPTION4H !="" && data.OPTION4H !="NA")  
                    answers.push({"textE":data.OPTION4,"index":3,"textH":data.OPTION4H,"isC":false});
                  else
                    answers.push({"textE":data.OPTION4,"index":3,"isC":false});
                }
                  
                if(data.OPTION5!=undefined && data.OPTION5!=null && data.OPTION5 !="" && data.OPTION5 !="NA")  {
                  if(data.OPTION5H !=undefined && data.OPTION5H !=null && data.OPTION5H !="" && data.OPTION5H !="NA")  
                    answers.push({"textE":data.OPTION5,"index":4,"textH":data.OPTION5,"isC":false});
                  else
                    answers.push({"textE":data.OPTION5,"index":4,"isC":false});
                }
                  
                if(data.OPTION6!=undefined && data.OPTION6!=null && data.OPTION6 !="" && data.OPTION6 !="NA")  {
                  if(data.OPTION6H!=undefined && data.OPTION6H !=null && data.OPTION6H !="" && data.OPTION6H !="NA")  
                    answers.push({"textE":data.OPTION6,"index":5,"textH":data.OPTION6,"isC":false});
                  else
                    answers.push({"textE":data.OPTION6,"index":5,"isC":false});
                }
                  
                
                // let answersH:any = [];
                // answersH.push({"text":data.OPTION1H,"index":0});
                // answersH.push({"text":data.OPTION2H,"index":1});
                // if(data.OPTION3H!=undefined && data.OPTION3H!=null && data.OPTION3H !="" && data.OPTION3H !="NA")
                //   answersH.push({"text":data.OPTION3H,"index":2});
                // if(data.OPTION4H!=undefined && data.OPTION4H !=null && data.OPTION4H !="" && data.OPTION4H !="NA")  
                //   answersH.push({"text":data.OPTION4H,"index":3});
                // if(data.OPTION5H !=undefined && data.OPTION5H !=null && data.OPTION5H !="" && data.OPTION5H !="NA")  
                //   answersH.push({"text":data.OPTION5H,"index":4});
                // if(data.OPTION6H!=undefined && data.OPTION6H !=null && data.OPTION6H !="" && data.OPTION6H !="NA")  
                //   answersH.push({"text":data.OPTION6H,"index":5});
                
                // let answer =  new QAnsLang();
                // answer.eng = answers;
                // answer.hin = answersH;
                let correctAnswer:any=[];
                if(data.QUESTIONTYPE.toLowerCase()=="sc"){
                  correctAnswer.push(data.CORRECTANSWER);
                  answers[data.CORRECTANSWER-1].isC=true;
                }
                  
                else if(data.QUESTIONTYPE.toLowerCase()=="mc"){
                  data.CORRECTANSWER.split(",").map(ans=>
                  {
                    correctAnswer.push(ans);
                    answers[ans-1].isC=true;
                  })
                }

                question.answers = this.utilService.encodeLOB(JSON.stringify(answers));
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
              }else{
                this.formattedData[index].hasError =true;
                this.formattedData[index].errorText="Topic not found."
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

