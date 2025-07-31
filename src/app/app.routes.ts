import { Routes } from '@angular/router';
import { PageComponent } from './page/page.component';
import { pageUrl } from '../environments/environment';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { MyTableComponent } from './my-table/my-table.component';
import { MenuComponent } from './menu/menu.component';

export const routes: Routes = [
    {
        component: PageComponent, path: pageUrl, children: [
            {
                component: UserComponent, path: 'user'
            },
            {
                component: RoleComponent, path: 'role'
            },
            {
                component: MenuComponent, path: 'menu'
            }
        ]
    }
];
