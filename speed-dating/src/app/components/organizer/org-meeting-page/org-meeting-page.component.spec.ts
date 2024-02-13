import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgMeetingPageComponent } from './org-meeting-page.component';

describe('OrgMeetingPageComponent', () => {
  let component: OrgMeetingPageComponent;
  let fixture: ComponentFixture<OrgMeetingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgMeetingPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgMeetingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
