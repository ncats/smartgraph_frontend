import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmrtgraphSearchComponent } from './smrtgraph-search.component';

describe('SmrtgraphSearchComponent', () => {
  let component: SmrtgraphSearchComponent;
  let fixture: ComponentFixture<SmrtgraphSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmrtgraphSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmrtgraphSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
