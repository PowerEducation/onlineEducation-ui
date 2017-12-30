import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeginTestComponentComponent } from './begin-test-component.component';

describe('BeginTestComponentComponent', () => {
  let component: BeginTestComponentComponent;
  let fixture: ComponentFixture<BeginTestComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeginTestComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeginTestComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
