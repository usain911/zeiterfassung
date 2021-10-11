import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StundenService } from '../service/stunden.service';
import { Mitarbeiter } from '../shared/mitarbeiter';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Login } from '../shared/login'
import { DialogService } from '../shared/dialog.service';

@Component({
  selector: 'app-mitarbeiter',
  templateUrl: './mitarbeiter.component.html',
  styleUrls: ['./mitarbeiter.component.css']
})
export class MitarbeiterComponent implements OnInit {
  mitarbeiter!: Mitarbeiter;
  edit: boolean = false;
  newPassword: boolean = false;
  checked: boolean = false;

  pwFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(6),
  ]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ss: StundenService,
    private as: AuthService,
    private fb: FormBuilder,
    private dialog: DialogService
  ) { }

  ngOnInit(): void {
    this.getMitarbeiter();
  }

  maForm = this.fb.group({
    name: [''],
    login: [''],
    rolle: ['']
  })

  initForm() {
    this.maForm.patchValue({
      name: this.mitarbeiter.name,
      login: this.mitarbeiter.login,
      rolle: this.mitarbeiter.rolle
    })
  }

  pwForm = this.fb.group({
    password: ['']
  })

  getMitarbeiter() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.ss.getMitarbeiter(id).subscribe(res => this.mitarbeiter = res);
    console.log(this.mitarbeiter );
  }

  editMitarbeiter() {
    this.edit = !this.edit;
    this.initForm();
  }

  async delMitarbeiter() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.dialog.openConfirmDialog("wirklich löschen?")
    .afterClosed().subscribe( res => {
      if(res) {
        this.del(id)
      }
    })
  }

  async del(id: number) {
    if(this.ss.delMitarbeiter(id)) {
      this.dialog.openOkDialog();
      this.router.navigateByUrl('mitarbeiterliste');
    } else {
      alert("fehler")
    }
  }

  editPassword() {
    this.newPassword = !this.newPassword;
  }


  async update() {
    const formValue = this.maForm.value;
    const newMa = {
      ...formValue,
      idmitarbeiter: this.mitarbeiter.idmitarbeiter
    }
    this.dialog.openConfirmDialog(newMa.name + " speichern?")
    .afterClosed().subscribe( res => {
      if(res) {
        this.write(newMa)
      }
    })

  }

  async write(ma: Mitarbeiter) {
    await this.ss.updateMa(ma).toPromise();
    this.edit = !this.edit;
    this.ngOnInit();
  }

  async savepw() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const data = this.pwForm.value;
    const newLogin: Login = {
      ...data,
      login: this.mitarbeiter.login,
      id: id
    }
    //await this.as.setNewPassword(newLogin).toPromise()
    this.dialog.openConfirmDialog("neues Passwort vergeben?")
    .afterClosed().subscribe( res => {
      if(res) {
        this.ss.updatePw(newLogin);
      }
    })
  }
}


@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: './dialog-elements-example-dialog.html',
})
export class DialogElementsExampleDialog {


}
function DialogBodyComponent(DialogBodyComponent: any, dialogConfig: MatDialogConfig<any>) {
  throw new Error('Function not implemented.');
}

