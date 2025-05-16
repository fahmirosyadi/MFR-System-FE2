import { Component, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-action-buttons',
  imports: [
    MatTableModule, 
    MatSortModule, 
    MatButtonModule, 
    MatIcon,
    MatDialogModule,
  ],
  templateUrl: './action-buttons.component.html',
  styles: ``
})
export class ActionButtonsComponent {
  @Input() action: any;

  // openDialog = () => {
  //   this.action();
  // }
}
