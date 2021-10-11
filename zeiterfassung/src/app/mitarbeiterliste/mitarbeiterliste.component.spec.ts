import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MitarbeiterlisteComponent } from './mitarbeiterliste.component';

describe('MitarbeiterlisteComponent', () => {
  let component: MitarbeiterlisteComponent;
  let fixture: ComponentFixture<MitarbeiterlisteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MitarbeiterlisteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MitarbeiterlisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
