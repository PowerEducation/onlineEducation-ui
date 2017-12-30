import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartExamModalComponent } from './start-exam-modal.component';

describe('StartExamModalComponent', () => {
  let component: StartExamModalComponent;
  let fixture: ComponentFixture<StartExamModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartExamModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartExamModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
