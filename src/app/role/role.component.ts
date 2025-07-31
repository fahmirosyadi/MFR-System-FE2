import { Component} from '@angular/core';
import { RoleFormComponent } from '../role-form/role-form.component';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html', 
  imports: [SharedModule]
})
export class RoleComponent {
  
  form = RoleFormComponent;

}
