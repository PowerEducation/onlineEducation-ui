import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatePaymentInfoComponent } from './candidate-payment-info.component';

describe('CandidatePaymentInfoComponent', () => {
  let component: CandidatePaymentInfoComponent;
  let fixture: ComponentFixture<CandidatePaymentInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidatePaymentInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatePaymentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
