import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloodyComponent } from './floody.component';

describe('FloodyComponent', () => {
  let component: FloodyComponent;
  let fixture: ComponentFixture<FloodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FloodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FloodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
