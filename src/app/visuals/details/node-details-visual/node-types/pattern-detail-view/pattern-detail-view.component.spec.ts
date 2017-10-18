import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternDetailViewComponent } from './pattern-detail-view.component';

describe('PatternDetailViewComponent', () => {
  let component: PatternDetailViewComponent;
  let fixture: ComponentFixture<PatternDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatternDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatternDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
