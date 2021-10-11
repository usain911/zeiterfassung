import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZeitEingabeComponent } from './zeit-eingabe.component';

describe('ZeitEingabeComponent', () => {
  let component: ZeitEingabeComponent;
  let fixture: ComponentFixture<ZeitEingabeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZeitEingabeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZeitEingabeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
