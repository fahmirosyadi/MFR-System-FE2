import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { AbstractComponent } from '../abstract/abstract.component';
import { SharedModule } from '../shared.module';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Scroll } from '@angular/router';
import { ScrollService } from '../services/scroll.service';
import { Subscription } from 'rxjs';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-chord-all',
  imports: [SharedModule],
  templateUrl: './chord-all.component.html'
})
export class ChordAllComponent extends AbstractComponent implements OnInit{
  
  data: any = [];
  list: string = "";
  tebaklirik: any = [];
  tebaklagu: any = [];
  type: string = 'chord'; // Default type
  private scrollSubscription: Subscription | undefined;

  constructor(public sanitizer: DomSanitizer, public cs: CommonService, public ss: ScrollService, public elementRef: ElementRef, public ar: ActivatedRoute) {
    super();

    this.ar.queryParams.subscribe(params => {
      if(params['type']){
        this.type = params['type'];
      }
      if(params['list']){
        this.list = params['list'];
      }
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    if(this.type === 'numeric') {
      const scrollPosition = event.target.documentElement.scrollTop || event.target.body.scrollTop;
      console.log("Scroll position: " + scrollPosition);
      this.cs.post({ position: scrollPosition }, 'scroll');
      this.ss.setScrollPosition(scrollPosition);
    }
  }

  ngOnInit(): void {
    
    let data = localStorage.getItem(this.list);
    this.data = data ? JSON.parse(data) : [];

    if (this.type === 'numeric') {
      // Display numeric chord notation
    } else {
      if(this.type === 'chord') {
        setInterval(() => {
          this.cs.get("scroll").then((data: any) => {
            if (data) {
              console.log("Scroll position fetched: " + data);
              // document.documentElement.scrollTop = data;
              window.scrollTo({ top: data, behavior: 'smooth' });
            }
          }).catch((error: any) => {
            console.error("Error fetching scroll position:", error);
          });
        }, 1000); // 1000ms = 1s
      }

    }
  }

  ngOnDestroy(): void {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
  }

}
