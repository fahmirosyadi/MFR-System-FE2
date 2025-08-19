import { Component, OnInit } from '@angular/core';
import { MyTableComponent } from '../my-table/my-table.component';
import { SongFormComponent } from '../song-form/song-form.component';
import { CommonService } from '../services/common.service';
import { SharedModule } from '../shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-song',
  imports: [MyTableComponent, SharedModule],
  templateUrl: './song.component.html',
  styles: ``
})
export class SongComponent implements OnInit {
  
  form = SongFormComponent
  data: any = [];
  tebaklirik: any = [];
  tebaklagu: any = [];

  constructor(public cs: CommonService, public router: Router) {
    
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
      // song.title = this.cs.stripHtml(part[i]);
      if(part[i]){
        song.key = this.cs.stripHtml(part[i].split("</h1>")[1]);
        song.title = this.cs.stripHtml(part[i].split("</h1>")[0]);
      }
      // if(part[i + 1] != null){
      //   song.key = this.cs.stripHtml(part[i + 1]);
      // }
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
          let keys = song.key.split(" | ");
          let maleChord = "";
          let femaleChord = "";
          keys.forEach((key: string) => {
            if(key.includes("M: ")){
              let k = key.replace("M: ", "");
              maleChord = this.convertToChord(chord, k[0]);
            }else if(key.includes("F: ")){
              let k = key.replace("F: ", "");
              femaleChord = this.convertToChord(chord, k[0]);
            }
          });
          song.parts.push({title: title, mod: mod, chord: chord, maleChord: maleChord, femaleChord: femaleChord});
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

  getSongs(query: string, callback: any) {
    this.cs.getSheet(query, "Songs", callback);
  }
  
  async getAllSongs() {
    let result = await this.getSongs("select *", (data: any) => {
      return data;
    });
    return result;
  }

  getData = (callback: any) => {
    this.data = this.cs.getSheet("select *", "List Tebak Lirik", (data: any) => {
      this.data = this.parseSongs(data);
      callback(this.data);
    });
  }

  chord = (row: any) => {
    this.router.navigate(['/chord/' + row.id]);
  }

  cspace = [1, 1.5, 2, 2.5, 3, 4, 4.5, 5, 5.5, 6, 6.5, 7];
  chromatic = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "Bb", "B"];

  getChromatic = (key:any) => {
    let result = [];
    let index = this.chromatic.indexOf(key);
    for(let i = index; i < this.chromatic.length + index; i++){
      result.push(this.chromatic[i % this.chromatic.length]);
    }
    return result;
  }

  replace(part: any, note: any, key: string) {
    let c = this.getChromatic(key);
    let chord = c[this.cspace.indexOf(note)];
    if([2, 3, 6].includes(note)){
      chord += "m";
    }else if([7].includes(note)){
      chord += "dim";
    }
    part = part.replace(new RegExp(note.toString(), 'g'), chord);
    part = part.replace(new RegExp("mM", 'g'), "");
    part = part.replace(new RegExp("dimb", 'g'), "b");
    return part;
  }

  convertToChord(part: string, key: string) {
    for(let i = 0; i < 8; i++){
      part = this.replace(part, i, key);
    }
    return part;
  }

  ngOnInit (): void {
    this.refresh();
    
  }

  async refresh() {
    this.tebaklirik = this.parseSongs(await this.cs.getPublic("tebaklirik.html"));
    this.tebaklagu = this.parseSongs(await this.cs.getPublic("tebaklagu.html"));
    // this.data = this.cs.getSheet("select *", "List Tebak Lirik", (data: any) => {
    //   this.data = this.parseSongs(data);
    //   // Save to local storage for later use
    //   localStorage.setItem('songs', JSON.stringify(this.data));
    // });
    localStorage.setItem('tebaklirik', JSON.stringify(this.tebaklirik));
    localStorage.setItem('tebaklagu', JSON.stringify(this.tebaklagu));
    console.log(this.tebaklirik);
  }
  
}
