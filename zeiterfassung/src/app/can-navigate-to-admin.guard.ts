import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { DialogService } from './shared/dialog.service';


@Injectable({
  providedIn: 'root'
})



export class CanNavigateToAdminGuard implements CanActivate {

  constructor(
    private ds: DialogService
  ) { }


  canActivate(): boolean {
    let str = window.btoa('rolle');
    if(localStorage.getItem(str) === window.btoa('1')) {
      //console.log(window.btoa('1')+ " | "+localStorage.getItem(str));

      return true
    }
    this.ds.openMessageDialog("Keine Berechtigung")
    console.log("keine Rechte");
    return false;
  }

}
