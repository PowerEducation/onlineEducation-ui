import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseLectureComponent } from './browse-lecture.component';

describe('BrowseLectureComponent', () => {
  let component: BrowseLectureComponent;
  let fixture: ComponentFixture<BrowseLectureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseLectureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseLectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
