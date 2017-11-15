import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmrtgraphSettingsComponent } from './smrtgraph-settings.component';

describe('SmrtgraphSettingsComponent', () => {
  let component: SmrtgraphSettingsComponent;
  let fixture: ComponentFixture<SmrtgraphSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmrtgraphSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmrtgraphSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
