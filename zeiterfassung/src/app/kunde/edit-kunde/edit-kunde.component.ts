import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StundenService } from 'src/app/service/stunden.service';
import { Kunde } from 'src/app/shared/kunde';

@Component({
  selector: 'app-edit-kunde',
  templateUrl: './edit-kunde.component.html',
  styleUrls: ['./edit-kunde.component.css']
})
export class EditKundeComponent implements OnInit {
  @Input() kunde!: Kunde;

  kundeForm = this.fb.group({
    name: ['', Validators.required],
    ansprechpartner: [{value: ''}],
    telefon: [''],
    strasse: [''],
    hausnummer: [''],
    plz: [''],
    ort: [''],
  });

  constructor(
    private fb: FormBuilder,
    private ss: StundenService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.kundeForm.patchValue({
      name:  this.kunde.name,
      ansprechpartner: this.kunde.ansprechpartner,
      telefon: this.kunde.telefon,
      strasse: this.kunde.strasse,
      hausnummer: this.kunde.hausnummer,
      plz: this.kunde.plz,
      ort: this.kunde.ort,
    });
  }

  async onSubmit() {
    const newData = this.kundeForm.value;
    const kunde: Kunde = {
      ...newData,
      idkunde: this.kunde.idkunde
    }
    this.ss.updateKunde(kunde);
  }

}
