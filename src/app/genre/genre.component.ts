import { Component } from '@angular/core';
import { UserFormComponent } from '../user-form/user-form.component';
import { MyTableComponent } from '../my-table/my-table.component';

@Component({
  selector: 'app-genre',
  imports: [MyTableComponent],
  templateUrl: './genre.component.html',
  styles: ``
})
export class GenreComponent {

  form = UserFormComponent;
  
}
