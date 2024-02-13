import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateMeetingComponent } from './rate-meeting.component';

describe('RateMeetingComponent', () => {
  let component: RateMeetingComponent;
  let fixture: ComponentFixture<RateMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateMeetingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RateMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
