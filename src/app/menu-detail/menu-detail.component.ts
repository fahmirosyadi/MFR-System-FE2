import { Component, Inject } from '@angular/core';
import { SharedModule } from '../shared.module';
import { CommonService } from '../services/common.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-menu-detail',
  imports: [SharedModule],
  templateUrl: './menu-detail.component.html'
})
export class MenuDetailComponent {

  constructor(
    public cs: CommonService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MenuDetailComponent>
  ){
    
  }

  save = () => {
    this.cs.post(this.data.data, this.data.url);
    this.dialogRef.close();
  }

}
