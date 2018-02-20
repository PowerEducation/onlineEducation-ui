import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestManagerViewComponent } from './test-manager-view.component';

describe('TestManagerViewComponent', () => {
  let component: TestManagerViewComponent;
  let fixture: ComponentFixture<TestManagerViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestManagerViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestManagerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
