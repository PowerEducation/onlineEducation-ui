import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseCoursesViewComponent } from './browse-courses-view.component';

describe('BrowseCoursesViewComponent', () => {
  let component: BrowseCoursesViewComponent;
  let fixture: ComponentFixture<BrowseCoursesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseCoursesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseCoursesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
