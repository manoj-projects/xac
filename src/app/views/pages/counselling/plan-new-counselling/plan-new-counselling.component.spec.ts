import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanNewCounsellingComponent } from './plan-new-counselling.component';

describe('PlanNewCounsellingComponent', () => {
  let component: PlanNewCounsellingComponent;
  let fixture: ComponentFixture<PlanNewCounsellingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanNewCounsellingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanNewCounsellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
