import { Component, OnInit } from '@angular/core';
import { AbstractComponent } from '../abstract/abstract.component';
import { SharedModule } from '../shared.module';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-chord-all',
  imports: [SharedModule],
  templateUrl: './chord-all.component.html'
})
export class ChordAllComponent extends AbstractComponent implements OnInit{
  
  data: any = [];
  tebaklirik: any = [];
  tebaklagu: any = [];

  constructor(public sanitizer: DomSanitizer) {
    super();
  }

  ngOnInit(): void {
    let tebaklirik = localStorage.getItem('tebaklirik');
    let tebaklagu = localStorage.getItem('tebaklagu');
    this.tebaklirik = tebaklirik ? JSON.parse(tebaklirik) : [];
    this.tebaklagu = tebaklagu ? JSON.parse(tebaklagu) : [];
    console.log(this.tebaklirik);
  }

}
