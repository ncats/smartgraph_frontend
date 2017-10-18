import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoundDetailViewComponent } from './compound-detail-view.component';

describe('CompoundDetailViewComponent', () => {
  let component: CompoundDetailViewComponent;
  let fixture: ComponentFixture<CompoundDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompoundDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompoundDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
