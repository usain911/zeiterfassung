import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStundenComponent } from './edit-stunden.component';

describe('EditStundenComponent', () => {
  let component: EditStundenComponent;
  let fixture: ComponentFixture<EditStundenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditStundenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStundenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
