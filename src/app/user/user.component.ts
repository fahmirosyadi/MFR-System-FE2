import {Component} from '@angular/core';
import { UserFormComponent } from '../user-form/user-form.component';
import { MyTableComponent } from '../my-table/my-table.component';

/**
 * @title Table with sorting
 */
@Component({selector: 'table-sorting-example', templateUrl: 'user.component.html', 
  imports: [MyTableComponent]
})
export class UserComponent {

  form = UserFormComponent;

}
