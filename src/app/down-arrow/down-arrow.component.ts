import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { TdScrollService } from '../scroll.service';

@Component({
  selector: 'td-down-arrow',
  templateUrl: './down-arrow.component.html',
  styleUrls: ['./down-arrow.component.scss']
})
export class TdDownArrowComponent implements OnDestroy, OnInit {
  scrollSub: Subscription;
  @ViewChild('downArrow') downArrow: ElementRef;
  constructor (
    private scrollService: TdScrollService,
    private renderer: Renderer2,
  ) {}

  ngOnInit () {
    this.scrollSub = this.scrollService.scrollSubject.subscribe(scroll => {
      const halfScreenHeight = window.innerHeight / 2;
      if (scroll.top >= halfScreenHeight - 20) {
        this.renderer.addClass(this.downArrow.nativeElement, 'hidden');
      } else {
        this.renderer.removeClass(this.downArrow.nativeElement, 'hidden');
      }
    });
  }

  ngOnDestroy () {
    this.scrollSub.unsubscribe();
  }

  onClick () {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  }

}
