import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloodDashboardComponent } from './flood-dashboard.component';

describe('FloodDashboardComponent', () => {
  let component: FloodDashboardComponent;
  let fixture: ComponentFixture<FloodDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FloodDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FloodDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
