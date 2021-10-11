import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StundenService } from '../service/stunden.service';
import { Mitarbeiter } from '../shared/mitarbeiter';

@Component({
  selector: 'app-mitarbeiterliste',
  templateUrl: './mitarbeiterliste.component.html',
  styleUrls: ['./mitarbeiterliste.component.css']
})
export class MitarbeiterlisteComponent implements OnInit {
  mitarbeiter?: Observable<Mitarbeiter[]>

  constructor(
    private _service: StundenService
  ) { }

  ngOnInit(): void {
    this.mitarbeiter = this._service.getAllMitarbeiter()
  }

}
