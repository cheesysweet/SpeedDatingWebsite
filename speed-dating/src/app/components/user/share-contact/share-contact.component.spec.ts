import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareContactComponent } from './share-contact.component';

describe('ShareContactComponent', () => {
  let component: ShareContactComponent;
  let fixture: ComponentFixture<ShareContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
