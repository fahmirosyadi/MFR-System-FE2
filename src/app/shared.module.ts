// shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MyTableComponent } from './my-table/my-table.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTreeModule} from '@angular/material/tree';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

// other imports...

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MyTableComponent,
    MatIconModule,
    MatButtonModule,
    MatTreeModule,
    MatFormFieldModule,
    MatLabel, 
    FormsModule,
    MatSelectModule
  ],
  exports: [
    CommonModule,
    MatInputModule,
    MyTableComponent,
    MatIconModule,
    MatButtonModule,
    MatTreeModule,
    MatLabel, 
    FormsModule,
    MatSelectModule
  ]
})
export class SharedModule {}