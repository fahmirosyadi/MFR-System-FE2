import { Component, Inject, Input } from '@angular/core';
import { CommonService } from '../services/common.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-app-form',
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatLabel, 
    FormsModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './app-form.component.html',
  styles: ``
})
export class AppFormComponent {
  

  constructor(
    private cs: CommonService, 
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private router: Router,
    public dialogRef: MatDialogRef<AppFormComponent>
  ){
    console.log(data)
  }

  save = () => {
    this.cs.post(this.data.data, this.data.url);
    this.dialogRef.close();
  }
}
