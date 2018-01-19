import { Component, OnInit, ViewChild, Inject, ChangeDetectionStrategy} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA,ErrorStateMatcher} from '@angular/material';

@Component({
  moduleId: module.id,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-single-valued-modal',
  templateUrl: './single-valued-modal.component.html',
  styleUrls: ['./single-valued-modal.component.css']
})
export class SingleValuedModalComponent implements OnInit {

  constructor(public dialog: MatDialogRef<SingleValuedModalComponent>, @Inject(MAT_DIALOG_DATA) public data:string) { }
  public typeInput="";
  ngOnInit() {
    console.log(this.data)
  }

onNoClick(): void {
    this.dialog.close();
  }

  close(value){
    console.log(value.length)
    this.dialog.close({
      "type":this.data,
      "value" : value
    });
  }

  saveData(){
    this.close(this.typeInput)
  }

}
