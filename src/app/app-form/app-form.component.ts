import { Component, Inject, Input } from '@angular/core';
import { CommonService } from '../services/common.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { AbstractComponent } from '../abstract/abstract.component';

@Component({
  selector: 'app-app-form',
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatLabel, 
    FormsModule,
    MatButtonModule,
    CommonModule,
    MatSelectModule
  ],
  templateUrl: './app-form.component.html',
  styles: ``
})
export class AppFormComponent extends AbstractComponent {

  constructor(
    private cs: CommonService, 
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private router: Router,
    public dialogRef: MatDialogRef<AppFormComponent>
  ){
    super();
    console.log(this.data.columns)
  }

  save = () => {
    this.cs.post(this.data.data, this.data.url);
    this.dialogRef.close();
  }
}
