import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportQuestionsXlsComponent } from './import-questions-xls.component';

describe('ImportQuestionsXlsComponent', () => {
  let component: ImportQuestionsXlsComponent;
  let fixture: ComponentFixture<ImportQuestionsXlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportQuestionsXlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportQuestionsXlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
