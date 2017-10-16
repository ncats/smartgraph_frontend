import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphDetailsComponent } from './graph-details.component';

describe('GraphDetailsComponent', () => {
  let component: GraphDetailsComponent;
  let fixture: ComponentFixture<GraphDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
