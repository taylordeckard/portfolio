import { AfterViewInit, Directive, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { TdScrollService } from './scroll.service';
import { UtilityService } from './utility.service';

@Directive({
  selector: '[tdScroll]',
})
export class TdScrollDirective implements AfterViewInit, OnDestroy {
  onWindowMoveBound = this.onWindowMove.bind(this);
  @HostListener('window:scroll', ['$event'])
  onScroll($event: Event) {
    this.onWindowMove($event);
  }
  constructor (
    private scrollService: TdScrollService,
    private elem: ElementRef,
    private util: UtilityService,
  ) {
    document.addEventListener('touchmove', this.onWindowMoveBound());
  }

  ngAfterViewInit () {
    this.scrollService.scrollHeight = this.elem.nativeElement.scrollHeight;
  }

  onWindowMove ($event: Event) {
    const doc = (<Document>($event && $event.target));
    const elem = this.util.isMobile ? document.body : ((doc && doc.documentElement)
      || document.documentElement);
    this.scrollService.scrollTop = elem.scrollTop;
    this.scrollService.scrollHeight = elem.scrollHeight;
  }

  ngOnDestroy () {
    document.removeEventListener('touchmove', this.onWindowMoveBound());
  }
}
