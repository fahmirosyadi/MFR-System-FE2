import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonService } from '../services/common.service';
import { RoleFormComponent } from '../role-form/role-form.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  imports: [
    MatTableModule, 
    MatSortModule, 
    MatButtonModule, 
    MatIcon,
    MatDialogModule
  ],
})
export class RoleComponent {
  
  constructor(public cs: CommonService, private dialog: MatDialog) { 

  }

  displayedColumns: string[] = ['no','role','symbol'];

  dataSource = new MatTableDataSource([]);
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  private _liveAnnouncer = inject(LiveAnnouncer);
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

  refresh = async () => {
    let users = await this.cs.get("role");
    this.dataSource.data = users;
    this.dataSource.sort = this.sort;
  }

  async ngAfterViewInit() {
    this.refresh();
  }

  openDialog(data: any) {
    const dialogRef = this.dialog.open(RoleFormComponent, {
      width: '250px',
      data: data
    });

    dialogRef.afterClosed().subscribe(() => {
      this.refresh(); // Call refresh after dialog is closed
    });
  }

  delete = (data: any) => {
    this.cs.delete("role/" + data.id, this.refresh)    
  }

}
