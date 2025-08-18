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
import { AbstractComponent } from '../abstract/abstract.component';
import { DialogService } from '../services/dialog.service';

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
export class MyTableComponent extends AbstractComponent {

  @Input() url: string = "";
  @Input() form: any = AppFormComponent;
  @Input() modal = true;
  @Input() cols: string[] = [];
  @Input() getData: any;
  @Input() rowClickCb: any;

  public displayedColumns: string[] = [];

  public _liveAnnouncer = inject(LiveAnnouncer);
  public dataSource = new MatTableDataSource([]);
  public columns: any = [];
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(public cs: CommonService, public dialog: MatDialog, public router: Router, private dialogService: DialogService) {
    super();
  }

  ngOnInit(): void {
    this.setCols();
    this.displayedColumns.unshift("no")
    this.displayedColumns.push("symbol")
    console.log(this.displayedColumns)
    this.refresh();
  }
  
  async ngAfterViewInit() {
  }

  setCols() {
    this.cols.forEach(async obj => {
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
  }

  async setDataSource() {
    for(let i = 0; i < this.columns.length; i++){
      if(this.columns[i].type[0] == this.columns[i].type[0].toUpperCase()){
        this.columns[i].data = await this.cs.get(this.columns[i].type.toLocaleLowerCase());
        console.log(this.columns[i].data);
      }
    }
  }
  
  async refresh() {
    console.log("tes")
    if(this.url != ""){
      this.dataSource.data = await this.cs.get(this.url);
      this.dataSource.sort = this.sort;
    }else if(this.getData != null){
      this.getData((data: any) => {
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
      });
    }
  }
  
  delete = (data: any) => {
    let self = this;
    this.dialogService.confirm('Are you sure you want to delete?').subscribe((result: any) => {
      if (result) {
        this.cs.delete(this.url + "/" + data.id, async () => {
          this.refresh();
        })
      }
    });    
  }

  async openDialog(data: any){
    await this.setDataSource();
    if(this.modal){
      const dialogRef = this.dialog.open(this.form, {
        width: '400px',
        data: { 
          columns: this.columns,
          url: this.url,
          data: data,
        }
      });
  
      dialogRef.afterClosed().subscribe(() => {
        this.refresh(); // Call refresh after dialog is closed
      });
    }else{
      this.router.navigateByUrl(this.url + "/form", { 
        state: { 
          data: { 
            columns: this.columns,
            url: this.url,
            data: data
          }
        } 
      });
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
