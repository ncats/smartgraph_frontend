import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactionVisualComponent } from './reaction-visual.component';

describe('ReactionVisualComponent', () => {
  let component: ReactionVisualComponent;
  let fixture: ComponentFixture<ReactionVisualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactionVisualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactionVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
