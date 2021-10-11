import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { StundenService } from '../service/stunden.service';
import { StundenzettelTag } from '../shared/stundenzettel-tag';
import { Kunde } from '../shared/kunde';
import { AuthService } from '../service/auth.service';



@Component({
  selector: 'app-zeit-ausgabe',
  templateUrl: './zeit-ausgabe.component.html',
  styleUrls: ['./zeit-ausgabe.component.css']
})

export class ZeitAusgabeComponent implements OnInit {

  admin = this.as.isAdmin();
  kunden!: Kunde[];
  alleMa: boolean = false;


  constructor(
    private ss: StundenService,
    private as: AuthService
  ) { }

  ngOnInit(): void {
    this.ss.getKunden().subscribe(res => this.kunden = res);
  }


}
