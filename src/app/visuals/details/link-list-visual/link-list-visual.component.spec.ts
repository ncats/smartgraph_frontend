import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkListVisualComponent } from './link-list-visual.component';

describe('LinkListVisualComponent', () => {
  let component: LinkListVisualComponent;
  let fixture: ComponentFixture<LinkListVisualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkListVisualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkListVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
