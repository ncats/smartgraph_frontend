import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkDetailsVisualComponent } from './link-details-visual.component';

describe('LinkDetailsVisualComponent', () => {
  let component: LinkDetailsVisualComponent;
  let fixture: ComponentFixture<LinkDetailsVisualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkDetailsVisualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkDetailsVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
