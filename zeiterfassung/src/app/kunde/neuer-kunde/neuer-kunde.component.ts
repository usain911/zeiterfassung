import { Component, Input, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StundenService } from 'src/app/service/stunden.service';
import { DialogService } from 'src/app/shared/dialog.service';
import { Kunde } from 'src/app/shared/kunde';


@Component({
  selector: 'app-neuer-kunde',
  templateUrl: './neuer-kunde.component.html',
  styleUrls: ['./neuer-kunde.component.css']
})
export class NeuerKundeComponent implements OnInit {
  @Input()  kunde!: Kunde;
  @Input() editing = false;

  kundeForm = this.fb.group({
    name: ['', Validators.required],
    ansprechpartner: [''],
    telefon: [''],
    strasse: [''],
    hausnummer: [''],
    plz: [''],
    ort: [''],
  })

  constructor(
    private ss: StundenService,
    private fb: FormBuilder,
    private router: Router,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
  }

  cancel(event: any):void {
    this.kundeForm.reset();
    this.router.navigateByUrl('dashboard');
  }

  save(event: any): void  {
        //console.log(this.kundeForm.value);
      const valueData = this.kundeForm.value;
      const kunde: Kunde = {
        ...valueData
      }
      //console.log(kunde);
      this.dialogService.openConfirmDialog(kunde.name + ' anlegen?')
      .afterClosed().subscribe(res =>{
        if(res) {
          this.ss.addKunde(kunde)
            //this.router.navigateByUrl('kundeliste');
            console.log("kunde ok");
          } else {
            console.log("fehler");
        }
      })
 }


}
