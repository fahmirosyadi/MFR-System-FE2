import { Component, Inject } from '@angular/core';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { CommonService } from '../services/common.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-song-form',
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatLabel, 
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './song-form.component.html'
})
export class SongFormComponent {
  
  public data: any;
  public columns: any;
  public url: any;

  constructor(
    private cs: CommonService, 
    private router: Router,
  ){
  }

  ngOnInit(): void {
    this.columns = history.state.data.columns;
    this.data = history.state.data.data;
    this.url = history.state.data.url;
  }

  save = () => {
    this.cs.post(this.data, this.url);
  }

}
