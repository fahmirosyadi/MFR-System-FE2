import { Component} from '@angular/core';
import { RoleFormComponent } from '../role-form/role-form.component';
import { MyTableComponent } from '../my-table/my-table.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html', 
  imports: [MyTableComponent]
})
export class RoleComponent {
  
  form = RoleFormComponent;

}
