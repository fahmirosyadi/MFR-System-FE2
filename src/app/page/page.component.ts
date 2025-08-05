import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { ActivatedRoute, NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { pageUrl } from '../../environments/environment';
import { CommonService } from '../services/common.service';
import { filter, Subscription } from 'rxjs';
import { SharedModule } from '../shared.module';

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
    SharedModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class PageComponent {

  private routerSubscription!: Subscription;

  page = pageUrl
  title = "";

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.title = document.title + this.getDetailTitle();
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.title = document.title + this.getDetailTitle();
    });
  }

  getDetailTitle = () => {
    return " / " + this.router.url[1].toUpperCase() + this.router.url.substring(2);
  }

}
