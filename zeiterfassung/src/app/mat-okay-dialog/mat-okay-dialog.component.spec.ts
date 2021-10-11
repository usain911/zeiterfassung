import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatOkayDialogComponent } from './mat-okay-dialog.component';

describe('MatOkayDialogComponent', () => {
  let component: MatOkayDialogComponent;
  let fixture: ComponentFixture<MatOkayDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatOkayDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatOkayDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
