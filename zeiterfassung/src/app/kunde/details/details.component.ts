import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Kunde } from 'src/app/shared/kunde';
import {FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { StundenService } from 'src/app/service/stunden.service';
import { DialogService } from 'src/app/shared/dialog.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  kunde$!: Observable<Kunde>;
  kunde!: Kunde;
  edit: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private ss: StundenService,
    private dialog: DialogService
  ) { }

  ngOnInit(): void {
    this.getKunde();
  }

  getKunde() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.ss.getKunde(id).subscribe(kunde => this.kunde = kunde);
  }

  editKunde() {
    this.edit = !this.edit;
  }


  async delKunde() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.dialog.openConfirmDialog('Wirklich löschen?')
    .afterClosed().subscribe( res => {
      if(res) {
        //this.delete(id);
        this.ss.delKunde(id);
      }
    })
  }


  async delete(id: number) {
    this.ss.delKunde(id)
  }

}
