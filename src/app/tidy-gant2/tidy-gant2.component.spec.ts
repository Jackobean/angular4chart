import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TidyGant2Component } from './tidy-gant2.component';

describe('TidyGant2Component', () => {
  let component: TidyGant2Component;
  let fixture: ComponentFixture<TidyGant2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TidyGant2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TidyGant2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
