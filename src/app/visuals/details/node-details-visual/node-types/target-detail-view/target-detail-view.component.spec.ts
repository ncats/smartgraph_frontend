import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetDetailViewComponent } from './target-detail-view.component';

describe('TargetDetailViewComponent', () => {
  let component: TargetDetailViewComponent;
  let fixture: ComponentFixture<TargetDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
