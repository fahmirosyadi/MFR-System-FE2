import { Routes } from '@angular/router';
import { PageComponent } from './page/page.component';
import { pageUrl } from '../environments/environment';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { MyTableComponent } from './my-table/my-table.component';
import { MenuComponent } from './menu/menu.component';
import { GenreComponent } from './genre/genre.component';
import { SongComponent } from './song/song.component';
import { SongFormComponent } from './song-form/song-form.component';
import { LoginComponent } from './login/login.component';
import { ChordComponent } from './chord/chord.component';

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
            },
            {
                component: GenreComponent, path: 'genre'
            },
            {
                component: SongComponent, path: 'song'
            },
            {
                component: SongFormComponent, path: 'song/form'
            },
            {
                component: ChordComponent, path: 'chord'
            }
        ]
    },
    {
        component: LoginComponent, path: 'login'
    }
];
