import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatMessageDialogComponent } from './mat-message-dialog.component';

describe('MatMessageDialogComponent', () => {
  let component: MatMessageDialogComponent;
  let fixture: ComponentFixture<MatMessageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatMessageDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatMessageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
