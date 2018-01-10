import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionManagerComponentComponent } from './question-manager-component.component';

describe('QuestionManagerComponentComponent', () => {
  let component: QuestionManagerComponentComponent;
  let fixture: ComponentFixture<QuestionManagerComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionManagerComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionManagerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
