import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateExamHistoryComponent } from './candidate-exam-history.component';

describe('CandidateExamHistoryComponent', () => {
  let component: CandidateExamHistoryComponent;
  let fixture: ComponentFixture<CandidateExamHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateExamHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateExamHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
