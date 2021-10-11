import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StundenService } from '../service/stunden.service';
import { DialogService } from '../shared/dialog.service';
import { StundenzettelRaw } from '../shared/stundenzettel-raw';
import { StundenzettelTag } from '../shared/stundenzettel-tag';

@Component({
  selector: 'app-edit-stunden',
  templateUrl: './edit-stunden.component.html',
  styleUrls: ['./edit-stunden.component.css']
})
export class EditStundenComponent implements OnInit {
  @Input() stundensatz!: StundenzettelTag;
  @Output() submitStundenzettel = new EventEmitter();

  constructor(
    private ss: StundenService,
    private fb: FormBuilder,
    private dialog: DialogService
  )
  {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(): void {
    this.initForm()
  }

  stundeForm = this.fb.group({
    stunden: ['', Validators.required],
    fahrzeit: [''],
    idstunden: [''],
    kunde: [''],
    mitarbeiter: [''],
    datum: [''],
    kommentar: ['']
  });

  initForm() {
    this.stundeForm.patchValue({
      idstunden: this.stundensatz.idstunden,
      stunden:  this.stundensatz.stunden,
      fahrzeit: this.stundensatz.fahrzeit,
      kunde: this.stundensatz.kunde.idkunde,
      mitarbeiter: this.stundensatz.mitarbeiter.idmitarbeiter,
      datum: this.stundensatz.datum,
      kommentar: this.stundensatz.kommentar
    });
  }

  save(){
    const formValue = this.stundeForm.value;
    const newStunden: StundenzettelRaw = {
      ...formValue,
    }
    this.dialog.openConfirmDialog("speichern?")
    .afterClosed().subscribe( res => {
      if(res) {
        this.write(newStunden)
      }
    })
  }

  async write(sz: StundenzettelRaw) {
    this.ss.updateStundensatz(sz);

  }

  cancel() {
    this.submitStundenzettel.emit();
  }

}
