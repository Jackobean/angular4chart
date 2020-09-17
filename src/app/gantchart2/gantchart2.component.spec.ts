import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gantchart2Component } from './gantchart2.component';

describe('Gantchart2Component', () => {
  let component: Gantchart2Component;
  let fixture: ComponentFixture<Gantchart2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Gantchart2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Gantchart2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
