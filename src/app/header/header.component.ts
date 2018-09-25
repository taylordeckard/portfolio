import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { TdScrollService } from '../scroll.service';

@Component({
  selector: 'td-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class TdHeaderComponent implements OnDestroy, OnInit {
  @ViewChild('header') header: ElementRef;
  headerFixed: boolean;
  scrollSub: Subscription;
  constructor (
    private scrollService: TdScrollService,
    private renderer: Renderer2,
  ) {}

  ngOnInit () {
    this.scrollSub = this.scrollService.scrollSubject.subscribe(scroll => {
      // fix header to top after scrolling down half of the screen height
      const halfScreenHeight = window.innerHeight / 2;
      if (scroll.top >= halfScreenHeight - 20) {
          this.renderer.addClass(this.header.nativeElement, 'fixed');
      } else {
          this.renderer.removeClass(this.header.nativeElement, 'fixed');
      }
      if (scroll.top >= halfScreenHeight + 40) {
        if (!this.headerFixed) {
          this.headerFixed = true;
        }
      } else {
        if (this.headerFixed) {
          this.headerFixed = false;
        }
      }
    });
  }

  ngOnDestroy () {
    this.scrollSub.unsubscribe();
  }

}
