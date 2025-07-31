import { Component, OnInit } from '@angular/core';
import { MyTableComponent } from '../my-table/my-table.component';
import { SongFormComponent } from '../song-form/song-form.component';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-song',
  imports: [MyTableComponent],
  templateUrl: './song.component.html',
  styles: ``
})
export class SongComponent implements OnInit {
  
  form = SongFormComponent
  data: any = [];

  constructor(public cs: CommonService) {
    
  }
  
  getSingers(query: string, callback: any) {
    this.cs.getSheetData(query, callback, "Singers");
  }

  getSongs(query: string, callback: any) {
    this.cs.getSheetData(query, (data: any) => {
      let result = "";
      data.forEach((item: any) => {
        result += item.name;
      });
      callback(this.parseSongs(result));
    }, "Songs");
  }

  async getAllSongs() {
    let result = await this.getSongs("select *", (data: any) => {
      return data;
    });
    return result;
  }

  parseSongs(songs: any) {
    let songData: any = [];
    let songList = songs.split("[End]")

    let songInd = 0;
    songList.forEach((s: any) => {
      let part = s.split("</p>");
      let song: any = {};
      let i = 0;
      while(this.cs.stripHtml(part[i]) == ''){	
        i++
      }
      song.id = songInd + 1;
      song.title = this.cs.stripHtml(part[i]);
      if(part[i + 1] != null){
        song.key = this.cs.stripHtml(part[i + 1]);
      }
      if(part[i + 2] != null){
        song.range = this.cs.stripHtml(part[i + 2]);
        if(song.range.split("-").length > 1){
          song.topPitch = song.range.split("-")[1].trim();
          song.bottomPitch = song.range.split("-")[0].trim();
        }
      }
      
      song.parts = [];
      part = s.split("[");
      delete(part[0]);
      let mod = "";
      part.forEach((p: any) => {
        let chord = "";
        let prt = p.split("]");
        let lines = prt[1].replace(/<\/p>/g, "<br>").trim();
        lines = lines.replace(/<p>/g, "<br>");
        lines = lines.replace(/<br \/>/g, "<br>");
        lines = lines.split("<br>");
        lines.forEach((line: any) => {
          let p = line.replace(/<br>/g, "").trim();
          if(!p.includes("null") && p != "" && p != " " && p != "&nbsp;"){
            chord += `<p>${p}</p>`;
          }
        })
        let title = this.cs.stripHtml(prt[0]);
        if(title == "Mod"){
          mod = `${title} ${this.cs.stripHtml(chord)}`;
        }else{
          song.parts.push({title: title, mod: mod, chord: chord});
          mod = "";
        }
            
      })
      if(song.title && song.title != "" && song.title != 'undefined'){
        songData.push(song);
      }

      songInd++;
    })
    return songData;
  }
  
  ngOnInit(): void {
    this.getSongs("select *", (data: any) => {
      console.log(data);
      this.data = data;
    });
  }
  
}
