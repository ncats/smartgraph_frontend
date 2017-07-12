import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeDetailsVisualComponent } from './node-details-visual.component';

describe('NodeDetailsVisualComponent', () => {
  let component: NodeDetailsVisualComponent;
  let fixture: ComponentFixture<NodeDetailsVisualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeDetailsVisualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeDetailsVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
