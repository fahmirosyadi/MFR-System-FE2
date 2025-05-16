import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { pageUrl } from '../../environments/environment';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-page',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterOutlet,
    MatCardModule,
    RouterModule,
    MatProgressSpinnerModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class PageComponent {

  title = "Home"
  page = pageUrl

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.route.snapshot.url[this.route.snapshot.url.length - 1]);
  }

}
