import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleValuedModalComponent } from './single-valued-modal.component';

describe('SingleValuedModalComponent', () => {
  let component: SingleValuedModalComponent;
  let fixture: ComponentFixture<SingleValuedModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleValuedModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleValuedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
