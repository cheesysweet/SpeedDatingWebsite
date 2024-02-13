import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantInfoComponent } from './participant-info.component';

describe('ParticipantInfoComponent', () => {
  let component: ParticipantInfoComponent;
  let fixture: ComponentFixture<ParticipantInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipantInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipantInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
