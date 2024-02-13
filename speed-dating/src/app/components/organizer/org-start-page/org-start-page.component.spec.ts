import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgStartPageComponent } from './org-start-page.component';

describe('OrgStartPageComponent', () => {
  let component: OrgStartPageComponent;
  let fixture: ComponentFixture<OrgStartPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgStartPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgStartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
