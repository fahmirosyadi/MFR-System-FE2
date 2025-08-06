import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { AbstractComponent } from '../abstract/abstract.component';
import { SharedModule } from '../shared.module';
import { CommonService } from '../services/common.service';
import { DialogService } from '../services/dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { MenuDetailComponent } from '../menu-detail/menu-detail.component';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

@Component({
  selector: 'app-menu',
  imports: [SharedModule],
  templateUrl: './menu.component.html'
})

export class MenuComponent extends AbstractComponent implements OnInit{

  public dataSource: any;

  public url = "menu";

  constructor(public cs: CommonService, public dialog: MatDialog, private dialogService: DialogService){
    super();
  }

  async ngOnInit(): Promise<void> {
    this.dataSource = await this.cs.get(this.url);
  }

  childrenAccessor = (node: FoodNode) => node.children ?? [];

  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;

  async refresh() {
    // this.dataSource.data = await this.cs.get(this.url);
  }

  async openDialog(data: any){
    const dialogRef = this.dialog.open(MenuDetailComponent, {
      width: '400px',
      data: { 
        url: this.url,
        data: data,
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.refresh(); // Call refresh after dialog is closed
    });
  };

  add(data: any){
    
  }

  delete = (data: any) => {
    // let self = this;
    // this.dialogService.confirm('Are you sure you want to delete?').subscribe((result: any) => {
    //   if (result) {
    //     this.cs.delete(this.url + "/" + data.id, async () => {
    //       this.refresh();
    //     })
    //   }
    // });    
  }

}