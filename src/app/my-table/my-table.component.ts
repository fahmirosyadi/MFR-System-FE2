import { Component, inject, Input, ViewChild } from '@angular/core';
import { CommonService } from '../services/common.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserFormComponent } from '../user-form/user-form.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ActionButtonsComponent } from '../action-buttons/action-buttons.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppFormComponent } from '../app-form/app-form.component';

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
    CommonModule
  ],
  templateUrl: './my-table.component.html',
  styles: ``
})
export class MyTableComponent {

  @Input() url: string = "";
  @Input() form: any = AppFormComponent;
  @Input() modal = true;
  @Input() cols: string[] = [];

  public displayedColumns: string[] = [];

  public _liveAnnouncer = inject(LiveAnnouncer);
  public dataSource = new MatTableDataSource([]);
  public columns: any = [];
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(public cs: CommonService, public dialog: MatDialog, public router: Router) { 

  }

  ngOnInit(): void {
    this.cols.forEach(obj => {
      let col = '';
      let type = 'text';
      if(!obj.includes(":")){
        col = obj
      }else{
        col = obj.split(":")[0];
        type = obj.split(":")[1];
      }
      if(type != 'hidden' && type != 'password'){
        this.displayedColumns.push(col);
      }
      this.columns.push({col: col, type: type})
    })
    this.displayedColumns.unshift("no")
    this.displayedColumns.push("symbol")
    console.log(this.displayedColumns)
    this.refresh();
  }
  
  async ngAfterViewInit() {
  }
  
  async refresh() {
    this.dataSource.data = await this.cs.get(this.url);
    this.dataSource.sort = this.sort;
  }
  
  delete = (data: any) => {
    let self = this;
    this.cs.delete(this.url + "/" + data.id, async () => {
      this.refresh();
    })    
  }

  generateLabel = (str: any) => {
    str = str.replace(/([A-Z])/g, ' $1').trim();
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return (str)
  }

  openDialog(data: any){
    if(this.modal){
      const dialogRef = this.dialog.open(this.form, {
        width: '250px',
        data: { 
          columns: this.columns,
          url: this.url,
          data: data
        }
      });
  
      dialogRef.afterClosed().subscribe(() => {
        this.refresh(); // Call refresh after dialog is closed
      });
    }else{
      this.router.navigateByUrl(this.url + "/form");
    }
  };

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
