import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {Observable} from "rxjs/Observable"
import {Subscription} from 'rxjs/Rx';
import {Modal, BSModalContext} from "angular2-modal/plugins/bootstrap";
import {overlayConfigFactory, Overlay} from "angular2-modal/esm/index";
import { ActivatedRoute, Router } from '@angular/router';
import {CommonUtilService} from '../../services/common-util.service';
import {CommonApiService} from '../../services/common-api.service';
import {DefinedConstants} from "../../app.defined.constants";
import {StartExamModalComponent} from '../modal/start-exam-modal/start-exam-modal.component';
import * as qAns from '../../../data/qAns.json';
import swal from 'sweetalert2';

@Component({
  selector: 'app-test-series',
  templateUrl: './test-series.component.html',
  styleUrls: ['./test-series.component.css']
})
export class TestSeriesComponent implements OnInit {

  constructor(private utilService :CommonUtilService, private definedConstants: DefinedConstants,
              private apiService : CommonApiService,private modal:Modal,overlay:Overlay, vcRef:ViewContainerRef,
              private router: Router, private route: ActivatedRoute ) {
    overlay.defaultViewContainer = vcRef; 
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
    swal.setDefaults({
  
  confirmButtonText: 'Next &rarr;',
  showCancelButton: true,
  progressSteps: ['1', '2', '3']
})

var steps = [
  {
    title: 'Rules for the Test',
    html: "Rule 1:     don't cancel and Read all the Rules."
  },{
    title:'Rule 2'
  },{
  title:'Rule 3'

  }
  
]

swal.queue(steps).then((result) => {
  swal.resetDefaults()
  
  if (result.length==3) {
    swal({
      title: "All the best for your Exam. Let's get started with your test." ,
    
      confirmButtonText: 'Begin Test',
      cancelButtonText:  '<i class="fa fa-thumbs-down"></i>'
      
    }).then((result) => {
  //  TODO Add Router to begin test:
  //  this.router.navigate(['/home'], { queryParams: { page:'testSeries'  } });
  this.router.navigate(['/beginTest'] );
})
  }
})
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

}
