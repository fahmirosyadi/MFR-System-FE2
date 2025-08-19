import { Component, OnInit } from '@angular/core';
import { AbstractComponent } from '../abstract/abstract.component';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'app-chord-all',
  imports: [SharedModule],
  templateUrl: './chord-all.component.html'
})
export class ChordAllComponent extends AbstractComponent implements OnInit{
  
  data: any = [];
  tebaklirik: any = [];
  tebaklagu: any = [];

  ngOnInit(): void {
    let tebaklirik = localStorage.getItem('tebaklirik');
    let tebaklagu = localStorage.getItem('tebaklagu');
    this.tebaklirik = tebaklirik ? JSON.parse(tebaklirik) : [];
    this.tebaklagu = tebaklagu ? JSON.parse(tebaklagu) : [];
    
  }

}
