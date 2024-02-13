import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMeetingPageComponent } from './user-meeting-page.component';

describe('UserMeetingPageComponent', () => {
  let component: UserMeetingPageComponent;
  let fixture: ComponentFixture<UserMeetingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserMeetingPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMeetingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
