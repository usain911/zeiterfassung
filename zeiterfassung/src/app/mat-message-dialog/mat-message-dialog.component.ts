import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-mat-message-dialog',
  templateUrl: './mat-message-dialog.component.html',
  styleUrls: ['./mat-message-dialog.component.css']
})
export class MatMessageDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {message: string},
    public dialogRef: MatDialogRef<MatMessageDialogComponent>) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close(false);
  }

}
