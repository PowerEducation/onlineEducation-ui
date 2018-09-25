import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllProductComponent } from './view-all-product.component';

describe('ViewAllProductComponent', () => {
  let component: ViewAllProductComponent;
  let fixture: ComponentFixture<ViewAllProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
