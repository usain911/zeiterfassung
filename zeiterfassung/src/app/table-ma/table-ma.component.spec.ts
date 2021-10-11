import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMaComponent } from './table-ma.component';

describe('TableMaComponent', () => {
  let component: TableMaComponent;
  let fixture: ComponentFixture<TableMaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableMaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
