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

  ngOnInit(): void {
    let songs = localStorage.getItem('songs');
    this.data = songs ? JSON.parse(songs) : [];
  }

}
