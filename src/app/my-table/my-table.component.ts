import { Component, inject, ViewChild } from '@angular/core';
import { CommonService } from '../services/common.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserFormComponent } from '../user-form/user-form.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ActionButtonsComponent } from '../action-buttons/action-buttons.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-table',
  imports: [
    MatTableModule, 
    MatSortModule, 
    MatButtonModule, 
    MatIcon,
    MatDialogModule,
    ActionButtonsComponent,
    RouterOutlet,
  ],
  templateUrl: './my-table.component.html',
  styles: ``
})
export class MyTableComponent {

  public _liveAnnouncer = inject(LiveAnnouncer);
  public dataSource = new MatTableDataSource([]);
  public url = "";
  public displayedColumns: string[] = [];
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(public cs: CommonService, public dialog: MatDialog) { 
  }

  getFormComponent() {
    return UserFormComponent
  }

  async refresh() {
    let users = await this.cs.get(this.url);
    this.dataSource.data = users;
    // this.dataSource.sort = this.sort;
  }

  async ngAfterViewInit() {
    this.refresh();
  }

  getUrl() {

  }

  openDialog(data: any){
    const dialogRef = this.dialog.open(this.getFormComponent(), {
      width: '250px',
      data: data
    });

    dialogRef.afterClosed().subscribe(() => {
      this.refresh(); // Call refresh after dialog is closed
    });
  };

  delete = (data: any) => {
    this.cs.delete(this.getUrl() + "/" + data.id, this.refresh)    
  }
  
  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
