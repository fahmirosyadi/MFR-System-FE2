import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  confirm(msg: any): any {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '350px',
      data: msg
    });

    return dialogRef.afterClosed();
  }
}