import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'app-chord',
  imports: [SharedModule],
  templateUrl: './chord.component.html'
})
export class ChordComponent implements OnInit{

  data: any = [];
  song: any = {};
  partInd = 0;
  
  constructor(public cs: CommonService, private route: ActivatedRoute) {
    
  }

  getSingers(query: string, callback: any) {
    this.cs.getSheetData(query, callback, "Singers");
  }

  getSongById(id: any) {
    return this.data.find((song: any) => song.id == id);
  }

  next(){
    if(this.partInd < this.song.parts.length - 1){
      this.partInd++;			
    }
  }

  prev(){
    if(this.partInd > -1){
      this.partInd--;
    }
  }

  ngOnInit(): void {
    let songs = localStorage.getItem('songs');
    this.data = songs ? JSON.parse(songs) : [];
    const id = this.route.snapshot.paramMap.get('id');
    this.song = this.getSongById(id);
    console.log(this.song)
    localStorage.setItem('title', this.song.title);
  }

}
