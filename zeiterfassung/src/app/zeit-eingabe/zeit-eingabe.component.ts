import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StundenService } from '../service/stunden.service';
import { DialogService } from '../shared/dialog.service';
import { Kunde } from '../shared/kunde';
import { StundenzettelRaw } from '../shared/stundenzettel-raw';


@Component({
  selector: 'app-zeit-eingabe',
  templateUrl: './zeit-eingabe.component.html',
  styleUrls: ['./zeit-eingabe.component.css']
})
export class ZeitEingabeComponent implements OnInit {
  title = 'Stundeneingabe';
  kunden!: Kunde[];

  selected = 'option2';
  datum = Date;
  uhrVon ="";
  uhrBis ="";
  zeit: number = 0;
  pause= 0;

  stundenzettelTag = new FormGroup({
    kunde: new FormControl('', Validators.required),
    datum: new FormControl('', Validators.required),
    uhrVon: new FormControl('', Validators.required),
    uhrBis: new FormControl('', Validators.required),
    pause: new FormControl('', Validators.required),
    fahrzeit: new FormControl('', Validators.required),//????
    kommentar: new FormControl(''),
  })

  constructor(
    private ss: StundenService,
    private ds: DialogService
    ) { }

  ngOnInit(): void {
    this.ss.getKunden().subscribe(res => this.kunden = res);
  }

  createDate() {
    //console.log(this.datum);
    let yyyy = 2021;
    let mm = 6;
    let dd = 10;
    let datum1 = new Date(yyyy, mm, dd);
    console.log(datum1);

  }

  min2dez(min: Number):number {
    //console.log("eingang " + min);
    if (min == 0)
      return 0
    if(min <= 15) {
      return 0.25
    } else if (min <= 30) {
      return 0.5
    } else if(min <= 45) {
      return 0.75
    } else {
      return 60
    }

  }

  calcTime():number {
    //console.log(this.uhrBis);
    //console.log(this.uhrVon);

    let datum1 = new Date(this.datum+"T"+this.uhrVon)
    let datum2 = new Date(this.datum+"T"+this.uhrBis)
    //console.log(datum1 + " | " + datum2);

    //console.log((datum2.getTime() - datum1.getTime())/60000);
    this.zeit = (datum2.getTime() - datum1.getTime())/60000;
    let min = (datum2.getTime() - datum1.getTime())/60000 - this.pause;

    //trunc entfernt alle nachkommestellen
    let stunden = Math.trunc((min/60));
    //console.log("vor " + stunden);

   let tmpMinuten = this.min2dez(min%60);
   if(tmpMinuten == 60) {
     stunden +=1
   } else {
    stunden += this.min2dez(min%60);
   }

    //console.log("stunden: " +stunden+ " min: " + min%60);

    return stunden
  }
  onSubmit() {
    const formValue = this.stundenzettelTag.value;
    const stunden = this.calcTime();
    const mid = this.ss.getMid();
    const newSz = new StundenzettelRaw(this.stundenzettelTag.value.datum,this.stundenzettelTag.value.fahrzeit,this.stundenzettelTag.value.kunde, mid ,stunden, this.stundenzettelTag.value.kommentar);
    // TODO: Use EventEmitter with form value
    console.warn(newSz);
    this.ds.openConfirmDialog(newSz.stunden + ' Stunden speichern?')
    .afterClosed().subscribe(res => {
      if(res) {
        this.ss.addStunden(newSz);
        this.stundenzettelTag.reset()
      }
    })
  }
}
