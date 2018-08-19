import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start-exam-modal',
  templateUrl: './start-exam-modal.component.html',
  styleUrls: ['./start-exam-modal.component.css']
})
export class StartExamModalComponent implements OnInit {

  public signIn;
  public signup;
  public close;

  constructor() { }
  public loginError:string="";
  ngOnInit() {
  }

}
