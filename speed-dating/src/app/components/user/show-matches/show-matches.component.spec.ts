import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMatchesComponent } from './show-matches.component';

describe('ShowMatchesComponent', () => {
  let component: ShowMatchesComponent;
  let fixture: ComponentFixture<ShowMatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowMatchesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
