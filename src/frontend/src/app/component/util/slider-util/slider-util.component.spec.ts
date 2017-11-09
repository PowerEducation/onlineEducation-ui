import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderUtilComponent } from './slider-util.component';

describe('SliderUtilComponent', () => {
  let component: SliderUtilComponent;
  let fixture: ComponentFixture<SliderUtilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderUtilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderUtilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
