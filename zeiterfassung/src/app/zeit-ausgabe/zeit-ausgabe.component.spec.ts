import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZeitAusgabeComponent } from './zeit-ausgabe.component';

describe('ZeitAusgabeComponent', () => {
  let component: ZeitAusgabeComponent;
  let fixture: ComponentFixture<ZeitAusgabeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZeitAusgabeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZeitAusgabeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
