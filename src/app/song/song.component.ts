import { Component } from '@angular/core';
import { MyTableComponent } from '../my-table/my-table.component';
import { SongFormComponent } from '../song-form/song-form.component';

@Component({
  selector: 'app-song',
  imports: [MyTableComponent],
  templateUrl: './song.component.html',
  styles: ``
})
export class SongComponent {

  form = SongFormComponent

}
