import { Component, Inject, Input } from '@angular/core';
import { CommonService } from '../services/common.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AbstractComponent } from '../abstract/abstract.component';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTreeModule} from '@angular/material/tree';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-app-form',
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTreeModule,
    MatFormFieldModule,
    MatLabel, 
    FormsModule,
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
