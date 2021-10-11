import { getLocaleDateFormat } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { StundenService } from '../service/stunden.service';
import { StundenzettelTag } from '../shared/stundenzettel-tag';
import { MatPaginator } from '@angular/material/paginator';
import { AuthService } from '../service/auth.service';
import { DialogService } from '../shared/dialog.service';
import { Mitarbeiter } from '../shared/mitarbeiter';
import { Kunde } from '../shared/kunde';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StundenzettelAbfrage } from '../shared/stundenzettel-abfrage';

interface Monat {
  value: number;
  viewValue: string;
}


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() kunden!: Kunde[];

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

  stundensatz!: StundenzettelTag;
  admin = this.as.isAdmin();
  edit = false;

  selectedKunde = '0';
  selectedMitarbeiter = '0';
  selectedMonat = '0';
  selectedTag = '0';
  selectedJahr = '2021';
  tageImMonat = 0;
  numbers: number[] = [28,29,30,31];
  form!: FormGroup;


  maOnly!: boolean;
  alleMa: boolean = false;
  ma!: Mitarbeiter;
  mitarbeiter!: Mitarbeiter[];
  stundenzettel!: StundenzettelTag[];

  dataSource = new MatTableDataSource<StundenzettelTag>(this.stundenzettel);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['datum','mName','kName','fahrzeit','stunden', 'kommentar'];
  array!: string[];

  constructor(
    private as: AuthService,
    private ss: StundenService,
    private ds: DialogService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    if (!this.as.isAdmin) {
      this.maOnly = true
      console.log("admin");

    } else {
      this.maOnly = false
      console.log("kein admin");

    }
    this.initForm()
    this.loadData();
  }

  loadData() {
    this.ss.getAllMitarbeiter().subscribe(res => this.mitarbeiter = res);
  }

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
  counter(i: number) {
    return new Array(i);
}

  ngOnChanges(): void {
    this.array = new Array('datum','mName','kName','fahrzeit','stunden', 'kommentar')
    console.log(this.kunden + " " + this.mitarbeiter);
    if(this.selectedKunde === "0" && this.selectedMitarbeiter === "0") {
      this.array.pop();
    }
    if(this.selectedKunde != "0") { this.array.splice(2,1)}
    if(this.selectedMitarbeiter != "0") { this.array.splice(1,1)}
    if(this.selectedTag != "0") {
      this.array.shift();
    }
    //console.log(this.array);
  }

  getArray():string[] {
    return this.displayedColumns
  }

  getTage(){
    this.tageImMonat = new Date(parseInt(this.selectedJahr),parseInt(this.selectedMonat),0).getDate();
   }

   onSubmit() {
     if(this.selectedMitarbeiter != "0") {
       this.maOnly = true;
       this.ss.getMitarbeiter(parseInt(this.selectedMitarbeiter)).subscribe(res => this.ma = res)
     } else {
       this.maOnly = false;
     }
     const values = this.form.value;
     if(values.mitarbeiter != 0) {
       this.ss.getMitarbeiter(values.mitarbeiter).subscribe(res => this.ma = res);
     }
     if(!values.mitarbeiter) {
       values.mitarbeiter = localStorage.getItem('auth');
     }
     const abfrage: StundenzettelAbfrage = {
       ...values,
     }
     console.log("ma: " + this.selectedMitarbeiter);
     //this.ss.getMitarbeiter(this.selectedMitarbeiter)
     this.ss.getStundenzettel(abfrage).subscribe(res => this.stundenzettel = res);
   }

  bearbeiten() {
    //console.log("click und edit= "+ this.edit);
    this.edit = !this.edit;
  }

  editStunden(id: number) {
    this.ss.getStundensatz(id).subscribe(r => this.stundensatz = r);
  }

  async delete(id: number) {
    this.ds.openConfirmDialog('Wirklich löschen?')
    .afterClosed().subscribe( res => {
      if(res) {
        this.write(id);
      }
    })
  }

  async write(id: number) {
    await this.ss.delStundensatz(id).toPromise();
    this.ngOnInit();
  }

}
