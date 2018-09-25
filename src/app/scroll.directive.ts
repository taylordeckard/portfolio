import { AfterViewInit, Directive, ElementRef, HostListener } from '@angular/core';
import { TdScrollService } from './scroll.service';

@Directive({
  selector: '[tdScroll]',
})
export class TdScrollDirective implements AfterViewInit {
  @HostListener('window:scroll', ['$event'])
  onScroll($event: Event) {
    const doc = <Document>$event.target;
    this.scrollService.scrollTop = doc.documentElement.scrollTop;
    this.scrollService.scrollHeight = doc.documentElement.scrollHeight;
  }
  constructor (
    private scrollService: TdScrollService,
    private elem: ElementRef,
  ) {}

  ngAfterViewInit () {
    this.scrollService.scrollHeight = this.elem.nativeElement.scrollHeight;
  }
}
