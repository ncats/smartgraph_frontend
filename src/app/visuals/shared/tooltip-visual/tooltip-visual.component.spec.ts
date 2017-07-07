import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltipVisualComponent } from './tooltip-visual.component';

describe('TooltipVisualComponent', () => {
  let component: TooltipVisualComponent;
  let fixture: ComponentFixture<TooltipVisualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TooltipVisualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TooltipVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
