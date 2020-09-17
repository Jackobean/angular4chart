import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpectrumChartComponent } from './spectrum-chart.component';

describe('SpectrumChartComponent', () => {
  let component: SpectrumChartComponent;
  let fixture: ComponentFixture<SpectrumChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpectrumChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpectrumChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
