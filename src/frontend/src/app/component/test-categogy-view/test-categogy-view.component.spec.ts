import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCategogyViewComponent } from './test-categogy-view.component';

describe('TestCategogyViewComponent', () => {
  let component: TestCategogyViewComponent;
  let fixture: ComponentFixture<TestCategogyViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestCategogyViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCategogyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
