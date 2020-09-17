import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackedSeriesExampleComponent } from './stacked-series-example.component';

describe('StackedSeriesExampleComponent', () => {
  let component: StackedSeriesExampleComponent;
  let fixture: ComponentFixture<StackedSeriesExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StackedSeriesExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StackedSeriesExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
