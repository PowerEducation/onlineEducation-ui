import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DefinedConstants } from '../../app.defined.constants';
import {CommonApiService} from '../../services/common-api.service';
import {CommonUtilService} from '../../services/common-util.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-test-categogy-view',
  templateUrl: './test-categogy-view.component.html',
  styleUrls: ['./test-categogy-view.component.css']
})
export class TestCategogyViewComponent implements OnInit {

  constructor(public _formBuilder: FormBuilder, public definedConstants: DefinedConstants,public utilService:CommonUtilService,
          public apiService:CommonApiService, public router: Router, public route: ActivatedRoute) { }

createNewCategory: FormGroup;
secondFormGroup: FormGroup;
thirdFormGroup: FormGroup;
testCategory:string;
categories:string;

  ngOnInit() {

       this.createNewCategory = this._formBuilder.group({
      testName: ['', Validators.required],
      testCategory: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
  }

categoryChanged(){

}


}
