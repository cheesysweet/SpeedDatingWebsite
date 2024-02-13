import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableListTsComponent } from './table-list.ts.component';

describe('TableListTsComponent', () => {
  let component: TableListTsComponent;
  let fixture: ComponentFixture<TableListTsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableListTsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableListTsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
