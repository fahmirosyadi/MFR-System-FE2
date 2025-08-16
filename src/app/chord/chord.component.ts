import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-chord',
  imports: [],
  templateUrl: './chord.component.html'
})
export class ChordComponent implements OnInit{

  data: any = [];
  
  constructor(public cs: CommonService) {
    
  }

  getSingers(query: string, callback: any) {
    this.cs.getSheetData(query, callback, "Singers");
  }

  getSongs(query: string, callback: any) {
    this.cs.getSheet(query, "Songs", callback);
  }

  async getAllSongs() {
    let result = await this.getSongs("select *", (data: any) => {
      return data;
    });
    return result;
  }

  ngOnInit(): void {
    // this.cs.getSheet("select *", "List Tebak Lirik", (data: any) => {
    //   this.data = this.parseSongs(data);
    //   console.log(this.data);
    // });
  }

}
