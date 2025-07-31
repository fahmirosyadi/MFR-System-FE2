import {Component} from '@angular/core';
import { UserFormComponent } from '../user-form/user-form.component';
import { AbstractComponent } from '../abstract/abstract.component';
import { SharedModule } from '../shared.module';
/**
 * @title Table with sorting
 */
@Component({selector: 'table-sorting-example', templateUrl: 'user.component.html', 
  imports: [SharedModule]
})
export class UserComponent extends AbstractComponent {

  form = UserFormComponent;

}
