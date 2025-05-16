
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild, inject, Injectable} from '@angular/core';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CommonService } from '../services/common.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../user-form/user-form.component';
import { MyTableComponent } from '../my-table/my-table.component';

/**
 * @title Table with sorting
 */
@Component({
  selector: 'table-sorting-example',
  templateUrl: 'user.component.html',
  imports: [
    MatTableModule, 
    MatSortModule, 
    MatButtonModule, 
    MatIcon,
    MatDialogModule,
  ],
})
@Injectable({
  providedIn: 'root'
})
export class UserComponent implements AfterViewInit {

  title = "User"

  constructor(public cs: CommonService, public dialog: MatDialog, private parent: MyTableComponent) { 
  }

  displayedColumns = ['no', 'nama', 'username', 'email', 'symbol'];

  async ngAfterViewInit() {
    this.parent.url = "user"
    this.parent.displayedColumns = ['no', 'nama', 'username', 'email', 'symbol'];
  }

}
