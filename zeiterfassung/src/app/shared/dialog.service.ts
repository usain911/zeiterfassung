import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { MatConfirmDialogComponent } from '../mat-confirm-dialog/mat-confirm-dialog.component';
import { MatMessageDialogComponent } from '../mat-message-dialog/mat-message-dialog.component';
import { MatOkayDialogComponent } from '../mat-okay-dialog/mat-okay-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private dialog: MatDialog
  ) { }

  openConfirmDialog(msg: string){
    return this.dialog.open(MatConfirmDialogComponent, {
      width: '390px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      position: { top: "10px" },
      data :{
        message: msg
      }
    });
  }

  openOkDialog() {
    this.dialog.open(MatOkayDialogComponent, {
      width: '390px',
      disableClose: true,
      position: { top: "10px"}
    })
  }

  openMessageDialog(msg: string) {
    this.dialog.open(MatMessageDialogComponent , {
      width: '390px',
      disableClose: true,
      position: { top: "10px"},
      data: {
        message: msg
      }
    })
  }
}
