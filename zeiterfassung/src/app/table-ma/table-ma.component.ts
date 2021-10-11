import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { StundenService } from '../service/stunden.service';
import { Kunde } from '../shared/kunde';
import { Mitarbeiter } from '../shared/mitarbeiter';
import { StundenzettelAbfrage } from '../shared/stundenzettel-abfrage';
import { StundenzettelTag } from '../shared/stundenzettel-tag';

interface Monat {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-table-ma',
  templateUrl: './table-ma.component.html',
  styleUrls: ['./table-ma.component.css']
})
export class TableMaComponent implements OnInit {
  @Input() kunden!: Kunde[];

  displayedColumns: string[] = ['datum', 'name', 'fahrzeit', 'stunden', 'kommentar'];
  stundenzettel!: StundenzettelTag[];
  dataSource = this.stundenzettel;


  monate: Monat[] = [
    {value: 1, viewValue: 'Januar'},
    {value: 2, viewValue: 'Februar'},
    {value: 3, viewValue: 'März'},
    {value: 4, viewValue: 'April'},
    {value: 5, viewValue: 'Mai'},
    {value: 6, viewValue: 'Juni'},
    {value: 7, viewValue: 'Juli'},
    {value: 8, viewValue: 'August'},
    {value: 9, viewValue: 'September'},
    {value: 10, viewValue: 'Oktober'},
    {value: 11, viewValue: 'November'},
    {value: 12, viewValue: 'Dezember'}
  ];

  selectedKunde = '0';
  selectedMitarbeiter = '0';
  selectedMonat = '0';
  selectedTag = '0';
  selectedJahr = '2021';
  tageImMonat = 0;
  numbers: number[] = [28,29,30,31];
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private as: AuthService,
    private ss: StundenService
  ) { }

  initForm() {
    if (this.form) {return;}
    this.form = this.fb.group({
      day: ['0'],
      month: ['8', Validators.required],
      year: ['2021' , Validators.required],
      kunde: ['0', Validators.required],
      mitarbeiter: ['0']
    })
  }

  getTage(){
    this.tageImMonat = new Date(parseInt(this.selectedJahr),parseInt(this.selectedMonat),0).getDate();
   }

  counter(i: number) {
    return new Array(i);
}

  ngOnInit(): void {
    this.loadData();
    this.initForm();
  }

  loadData() {
  }


  zeigeStundenMa(){
    let mId = this.as.getId();
    //this.maOnly = true;
    const values = this.form.value;
    const abfrage: StundenzettelAbfrage = {
      ...values,
      mitarbeiter: mId
    }
    //console.log(abfrage);
    this.ss.getStundenzettel(abfrage).subscribe(res => this.stundenzettel = res);
  }


}
