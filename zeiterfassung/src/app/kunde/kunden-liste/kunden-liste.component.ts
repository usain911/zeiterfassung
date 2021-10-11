import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StundenService } from 'src/app/service/stunden.service';
import { Kunde } from 'src/app/shared/kunde';

@Component({
  selector: 'app-kunden-liste',
  templateUrl: './kunden-liste.component.html',
  styleUrls: ['./kunden-liste.component.css']
})
export class KundenListeComponent implements OnInit {
  kunden$: Observable<Kunde[]> | undefined;
  k: Kunde[] | undefined;
  constructor(
    //private ks: KundenService,
    private ss: StundenService
  ) { }

  ngOnInit(): void {
    //this.loadData()
    this.kunden$ = this.ss.getKunden();
  }

  loadData() {
    //console.log(this.ks.getKunden().subscribe(r => this.k = r));
    //console.log(" kunde: "+this.k);


  }

}
