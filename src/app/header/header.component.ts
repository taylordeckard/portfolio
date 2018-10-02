import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { TdScrollService } from '../scroll.service';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'td-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class TdHeaderComponent implements OnDestroy, OnInit {
  @ViewChild('header') header: ElementRef;
  headerFixed: boolean;
  scrollSub: Subscription;
  scroll: any;
  constructor (
    private cdr: ChangeDetectorRef,
    private scrollService: TdScrollService,
    private renderer: Renderer2,
    private util: UtilityService,
  ) {}

  ngOnInit () {
    this.scrollSub = this.scrollService.scrollSubject.subscribe(scroll => {
      this.scroll = scroll;
      // fix header to top after scrolling down half of the screen height
      const halfScreenHeight = window.innerHeight * this.util.heroHeight;
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
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy () {
    this.scrollSub.unsubscribe();
  }

}
