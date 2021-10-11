import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KundenListeComponent } from './kunden-liste.component';

describe('KundenListeComponent', () => {
  let component: KundenListeComponent;
  let fixture: ComponentFixture<KundenListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KundenListeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KundenListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
