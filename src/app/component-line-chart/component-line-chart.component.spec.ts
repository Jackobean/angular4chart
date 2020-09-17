import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentLineChartComponent } from './component-line-chart.component';

describe('ComponentLineChartComponent', () => {
  let component: ComponentLineChartComponent;
  let fixture: ComponentFixture<ComponentLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentLineChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
