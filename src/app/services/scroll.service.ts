import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor() { }

  private scrollPosition = new Subject<number>();

  setScrollPosition(position: number) {
    this.scrollPosition.next(position);
  }

  getScrollPosition() {
    return this.scrollPosition.asObservable();
  }

}
