import { Component, OnInit } from '@angular/core';
import { StundenService } from '../service/stunden.service';
import { Kunde } from '../shared/kunde';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  kunden!: Kunde[];
  public onWork!: boolean;

  constructor(
    private ss: StundenService
  ) {
  }

  ngOnInit(): void {
    //fetch('http://192.168.178.24/backend/decker/ma/getAllMitarbeiter.php').then(r => r.json()).then(j => { console.log(j); });
    this.ss.getKunden().subscribe(res => this.kunden = res);
    if (localStorage.getItem("working")) {
      //this.onWork = localStorage.getItem("working")
    } else this.onWork = false;
  }

  public startWork(event?: any): void {
    let datum = new Date();
    this.onWork = true;
    console.log("start at" +  datum);
    localStorage.setItem("working", "true");
  }

  endWork(event?: any): void {
    let datum = new Date();
    console.log("ende"  +  datum);
    this.onWork = false;
    localStorage.setItem("working", "false");
  }

}
