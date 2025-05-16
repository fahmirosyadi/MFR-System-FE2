import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonService } from '../services/common.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-form',
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatLabel, 
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './role-form.component.html',
  styles: ``
})
export class RoleFormComponent {
  constructor(
    private cs: CommonService, 
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private router: Router,
    public dialogRef: MatDialogRef<RoleFormComponent>
  ){
    console.log(data)
  }

  save = () => {
    this.cs.post(this.data, "role");
    this.dialogRef.close();
    // this.router.navigate(['/page/user']);
  }
}
