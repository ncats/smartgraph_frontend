import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmrtgraphMenuComponent } from './smrtgraph-menu.component';

describe('SmrtgraphMenuComponent', () => {
  let component: SmrtgraphMenuComponent;
  let fixture: ComponentFixture<SmrtgraphMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmrtgraphMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmrtgraphMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
