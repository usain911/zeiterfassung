import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditKundeComponent } from './edit-kunde.component';

describe('EditKundeComponent', () => {
  let component: EditKundeComponent;
  let fixture: ComponentFixture<EditKundeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditKundeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditKundeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
