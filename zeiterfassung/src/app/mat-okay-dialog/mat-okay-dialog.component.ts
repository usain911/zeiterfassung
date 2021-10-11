import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-mat-okay-dialog',
  templateUrl: './mat-okay-dialog.component.html',
  styleUrls: ['./mat-okay-dialog.component.css']
})
export class MatOkayDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {message: string},
  public dialogRef: MatDialogRef<MatOkayDialogComponent>) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
