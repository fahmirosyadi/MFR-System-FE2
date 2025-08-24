import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SharedModule } from '../shared.module';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { AbstractComponent } from '../abstract/abstract.component';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-authorization',
  imports: [SharedModule],
  templateUrl: './authorization.component.html'
})
export class AuthorizationComponent extends AbstractComponent implements OnInit {
  
  
  public dataSource = new MatTableDataSource([]);
  public _liveAnnouncer = inject(LiveAnnouncer);
  public columns: any = [];
  public roles: any = [];
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(public cs: CommonService) {
    super();
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh = async () => {
    this.roles = await this.cs.get("role");
    this.dataSource.data = await this.cs.get("menu");
    this.dataSource.sort = this.sort;
  } 
  
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
