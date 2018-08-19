import { Component, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import {Observable} from "rxjs/Observable"
import {Subscription} from 'rxjs/Rx';
// import { Modal } from 'angular2-modal/plugins/bootstrap';/
// import { ModalModule, OverlayRenderer, DOMOverlayRenderer, Overlay } from 'angular2-modal';
// import { Modal, BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
// import {Modal, BSModalContext} from "angular2-modal/plugins/bootstrap";
// import {overlayConfigFactory, Overlay} from "angular2-modal/esm/index";
// import { DialogRef, ModalComponent } from 'angular2-modal';
// import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import {CommonUtilService} from '../../services/common-util.service';
import {CommonApiService} from '../../services/common-api.service';
import {DefinedConstants} from "../../app.defined.constants";
import {StartExamModalComponent} from '../modal/start-exam-modal/start-exam-modal.component';
import * as qAns from '../../../data/qAns.json';
import * as XLSX from 'xlsx';

import swal from 'sweetalert2';

type AOA = any[][];
@Component({
  selector: 'app-test-series',
  templateUrl: './test-series.component.html',
  styleUrls: ['./test-series.component.css'],
  providers: [Modal]
})
export class TestSeriesComponent implements OnInit {

  constructor(public utilService :CommonUtilService, public definedConstants: DefinedConstants,
              public apiService : CommonApiService,public modal:Modal,
              public router: Router, public route: ActivatedRoute ) {
    }


  ngOnInit() {
  this.getQAns();
  }

/**
 * 
 */
  getQAns(){
   this.apiService.genericMockedData(qAns).subscribe(
     response =>{
       console.log("response"+response);
     },
   error=>{

   });
  }

  startTest(){
//     swal.setDefaults({
  
//   confirmButtonText: 'Next &rarr;',
//   showCancelButton: true,
//   progressSteps: ['1', '2', '3']
// })

// var steps = [
//   {
//     title: 'Rules for the Test',
//     html: "Rule 1:     don't cancel and Read all the Rules."
//   },{
//     title:'Rule 2'
//   },{
//   title:'Rule 3'

//   }
  
// ]

// swal.queue(steps).then((result) => {
//   swal.resetDefaults()
  
//   if (result.length==3) {
//     swal({
//       title: "All the best for your Exam. Let's get started with your test." ,
    
//       confirmButtonText: 'Begin Test',
//       cancelButtonText:  '<i class="fa fa-thumbs-down"></i>'
      
//     }).then((result) => {
//   //  TODO Add Router to begin test:
//   //  this.router.navigate(['/home'], { queryParams: { page:'testSeries'  } });
//   this.router.navigate(['/beginTest'] );
// })
//   }
// })
    //  var dialog = this.modal.open(StartExamModalComponent, overlayConfigFactory({}, BSModalContext));
    // dialog
    //   .then((d) => d.result)
    //   .then((r) => {
    //     /*let navigationExtras:NavigationExtras = {
    //      }*/
    //     if (r)
    //       console.log("r>>>"+r);
    //   });
    // console.log("Signing in>>");
  
  }

  // onFileChange(evt: any) {
  //   /* wire up file reader */
  //   const target: DataTransfer = <DataTransfer>(evt.target);
  //   if (target.files.length !== 1) throw new Error('Cannot use multiple files');
  //   const reader: FileReader = new FileReader();
  //   reader.onload = (e: any) => {
  //     /* read workbook */
  //     const bstr: string = e.target.result;
  //     const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

  //     /* grab first sheet */
  //     const wsname: string = wb.SheetNames[0];
  //     const ws: XLSX.WorkSheet = wb.Sheets[wsname];

  //     /* save data */
  //     // this.data = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1}));
  //   };
  //   reader.readAsBinaryString(target.files[0]);
  // }

  data: AOA = [ [1, 2], [3, 4] ];
  public formattedData:any=[];
  
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
			this.data = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1}));
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
        this.formattedData.push(tempquestion);
      });
      console.log(JSON.stringify( this.formattedData))
     }else{
       swal("","Invalid Excel Sheet. PLease try again with proper Header","error")
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
      console.log()
    }

  }
  save(){
    console.log(JSON.stringify(this.formattedData))
  }
  validateQuestions(){
    console.log(JSON.stringify(this.formattedData));
  }

}
