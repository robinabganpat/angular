import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HlChartComponent } from './hl-chart.component';

describe('HlChartComponent', () => {
  let component: HlChartComponent;
  let fixture: ComponentFixture<HlChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HlChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HlChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
