import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MitarbeiterComponent } from '../mitarbeiter/mitarbeiter.component';
import { AuthService } from '../service/auth.service';
import { StundenService } from '../service/stunden.service';
import { DialogService } from '../shared/dialog.service';
import { Mitarbeiter } from '../shared/mitarbeiter';

@Component({
  selector: 'app-add-mitarbeiter',
  templateUrl: './add-mitarbeiter.component.html',
  styleUrls: ['./add-mitarbeiter.component.css']
})
export class AddMitarbeiterComponent implements OnInit {


  constructor(
    private fb: FormBuilder,
    private ss: StundenService,
    private router: Router,
    private ds: DialogService
  ) { }

  ngOnInit(): void {
  }

  mitarbeiterForm = this.fb.group({
    login: ['', Validators.required],
    name: ['', Validators.required],
    password: ['', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(10)
      ]],
    rolle: ['']
  })

  reset() {
    this.mitarbeiterForm.reset();
  }

  async onSubmit() {
    //fetch('/api/get_post_by_id/1').then(r => r.json()).then(j => { console.log(j); });
    //console.log(this.mitarbeiterForm.value);
    this.ds.openConfirmDialog(this.mitarbeiterForm.value.name + ' anlegen?')
    .afterClosed().subscribe(res => {
      if(res) {
        this.write(this.mitarbeiterForm.value)
      }
    })
  }

  async write(ma: Mitarbeiter) {
    await this.ss.addMitarbeiter(ma).toPromise().then((res: any) => {
      if(res) {
        console.log(res + "erfolgreich");
        if(res) {
          this.ds.openOkDialog();
          this.router.navigateByUrl('mitarbeiterliste');
        }
      } else  {
        this.ds.openMessageDialog("Fehler: login schon vorhanden oder sonst. Fehler!")
      }
    })


  }

}
