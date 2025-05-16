import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonService } from '../services/common.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatLabel, 
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {

  constructor(
    private cs: CommonService, 
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private router: Router,
    public dialogRef: MatDialogRef<UserFormComponent>
  ){
    console.log(data)
  }

  save = () => {
    this.cs.post(this.data, "user");
    this.dialogRef.close();
    // this.router.navigate(['/page/user']);
  }

}
